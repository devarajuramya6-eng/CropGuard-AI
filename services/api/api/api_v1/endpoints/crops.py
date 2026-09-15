from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.crop import Crop
from models.user import User
from schemas.crop import CropCreate, CropUpdate, CropResponse

router = APIRouter()

@router.get("/", response_model=List[CropResponse])
def read_crops(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    # Any authenticated user can read the global crop catalog
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve crop catalog.
    """
    crops = db.query(Crop).offset(skip).limit(limit).all()
    return crops

@router.post("/", response_model=CropResponse)
def create_crop(
    *,
    db: Session = Depends(get_db),
    crop_in: CropCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create a new crop in the global catalog.
    In a fully featured implementation, this should be restricted to ADMIN roles.
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can modify the crop catalog")
        
    crop = db.query(Crop).filter(Crop.name == crop_in.name).first()
    if crop:
        raise HTTPException(status_code=400, detail="Crop already exists in catalog")
        
    crop = Crop(
        name=crop_in.name,
        scientific_name=crop_in.scientific_name,
        description=crop_in.description,
        environmental_requirements=crop_in.environmental_requirements
    )
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop
