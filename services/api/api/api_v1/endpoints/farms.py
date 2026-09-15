from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.farm import Farm
from models.user import User
from schemas.farm import FarmCreate, FarmUpdate, FarmResponse

router = APIRouter()

@router.get("/", response_model=List[FarmResponse])
def read_farms(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve farms for the current user. Ensures data privacy.
    """
    farms = db.query(Farm).filter(Farm.owner_id == current_user.id).offset(skip).limit(limit).all()
    return farms

@router.post("/", response_model=FarmResponse)
def create_farm(
    *,
    db: Session = Depends(get_db),
    farm_in: FarmCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new farm.
    """
    farm = Farm(
        name=farm_in.name,
        location=farm_in.location,
        area=farm_in.area,
        soil_type=farm_in.soil_type,
        irrigation_type=farm_in.irrigation_type,
        owner_id=current_user.id
    )
    db.add(farm)
    db.commit()
    db.refresh(farm)
    return farm

@router.delete("/{id}", response_model=FarmResponse)
def delete_farm(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a farm. Ensures the user owns the farm before deletion.
    """
    farm = db.query(Farm).filter(Farm.id == id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    if farm.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this farm")
    db.delete(farm)
    db.commit()
    return farm
