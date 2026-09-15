from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.field import Field
from models.farm import Farm
from models.user import User
import schemas.field
from schemas.field import FieldCreate, FieldUpdate, FieldResponse

router = APIRouter()

@router.get("/farm/{farm_id}", response_model=List[FieldResponse])
def read_fields_by_farm(
    farm_id: int,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve fields for a specific farm. Validates farm ownership.
    """
    farm = db.query(Farm).filter(Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    if farm.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this farm")
        
    fields = db.query(Field).filter(Field.farm_id == farm_id).offset(skip).limit(limit).all()
    return fields

@router.post("/", response_model=FieldResponse)
def create_field(
    *,
    db: Session = Depends(get_db),
    field_in: FieldCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new field in a farm. Validates farm ownership first.
    """
    farm = db.query(Farm).filter(Farm.id == field_in.farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    if farm.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to modify this farm")

    field = Field(
        name=field_in.name,
        area=field_in.area,
        crop_type=field_in.crop_type,
        planting_date=field_in.planting_date,
        expected_harvest_date=field_in.expected_harvest_date,
        farm_id=field_in.farm_id
    )
    db.add(field)
    db.commit()
    db.refresh(field)
    return field

@router.get("/{field_id}/history", response_model=List[schemas.field.FieldHistoryResponse])
def get_field_health_history(
    field_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve the chronological health history and AI predictions for a specific field.
    """
    field = db.query(Field).filter(Field.id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
        
    farm = db.query(Farm).filter(Farm.id == field.farm_id).first()
    if farm.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this field's history")
        
    # In a fully integrated environment, we query:
    # UploadedImage JOIN DiseasePrediction WHERE field_id == field_id
    # We simulate the timeline assembly here for architecture demonstration.
    
    history = [
        {
            "date": field.planting_date.isoformat() if field.planting_date else "2026-05-01",
            "event_type": "Planting",
            "description": f"Planted {field.crop_type or 'crop'} in {field.name}.",
            "severity": "Healthy",
            "image_url": None
        },
        {
            "date": "2026-06-15",
            "event_type": "AI Diagnosis",
            "description": "AI detected Early Blight symptoms.",
            "severity": "Moderate",
            "image_url": "/static/simulated_leaf.jpg"
        }
    ]
    
    return history
