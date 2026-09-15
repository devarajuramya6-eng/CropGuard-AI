from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.field import Field
from models.farm import Farm
from models.user import User
from models.risk import RiskAssessment
from core.weather import WeatherProvider, get_weather_provider
from services.risk_engine import risk_engine

router = APIRouter()

@router.get("/field/{field_id}")
def get_field_risk_assessment(
    field_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
    weather_provider: WeatherProvider = Depends(get_weather_provider)
) -> Any:
    """
    Calculate and return the disease risk for a specific field based on current weather.
    """
    field = db.query(Field).filter(Field.id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
        
    farm = db.query(Farm).filter(Farm.id == field.farm_id).first()
    if farm.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this field")
        
    # Get current weather for the farm's location
    location = farm.location or "Unknown"
    current_weather = weather_provider.get_current_weather(location)
    
    # Calculate risk
    crop_type = field.crop_type or "Unknown Crop"
    risk_result = risk_engine.calculate_risk(crop_type, current_weather)
    
    # Save the assessment to DB for historical tracking
    assessment_record = RiskAssessment(
        field_id=field.id,
        overall_risk=risk_result["overall_risk"],
        warnings=risk_result["warnings"]
    )
    db.add(assessment_record)
    db.commit()
    
    return risk_result
