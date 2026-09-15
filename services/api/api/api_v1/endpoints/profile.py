from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.user import User
from models.profile import UserProfile
from schemas.profile import UserProfileUpdate, UserProfileResponse

router = APIRouter()

@router.get("/", response_model=UserProfileResponse)
def get_user_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get current user's profile details. Auto-creates if missing.
    """
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("/", response_model=UserProfileResponse)
def update_user_profile(
    *,
    db: Session = Depends(get_db),
    profile_in: UserProfileUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Update user profile.
    """
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
        
    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
        
    db.commit()
    db.refresh(profile)
    return profile
