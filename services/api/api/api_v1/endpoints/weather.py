from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.farm import Farm
from models.user import User
from core.weather import WeatherProvider, get_weather_provider

router = APIRouter()

@router.get("/farm/{farm_id}")
def get_farm_weather(
    farm_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
    weather_provider: WeatherProvider = Depends(get_weather_provider)
) -> Any:
    """
    Get current weather and forecast for a specific farm's location.
    Validates farm ownership before returning data.
    """
    farm = db.query(Farm).filter(Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    if farm.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this farm's weather data")
        
    location = farm.location or "Unknown Location"
    
    current = weather_provider.get_current_weather(location)
    forecast = weather_provider.get_forecast(location)
    
    return {
        "current": current,
        "forecast": forecast["forecast"]
    }
