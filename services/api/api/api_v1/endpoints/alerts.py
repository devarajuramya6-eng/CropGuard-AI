from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.user import User
from models.alert import Alert, NotificationPreference
from schemas.alert import NotificationPreferenceUpdate, NotificationPreferenceResponse, AlertResponse

router = APIRouter()

@router.get("/preferences", response_model=NotificationPreferenceResponse)
def get_preferences(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get current user's notification preferences.
    """
    prefs = db.query(NotificationPreference).filter(NotificationPreference.user_id == current_user.id).first()
    if not prefs:
        # Auto-create defaults if none exist
        prefs = NotificationPreference(user_id=current_user.id)
        db.add(prefs)
        db.commit()
        db.refresh(prefs)
    return prefs

@router.put("/preferences", response_model=NotificationPreferenceResponse)
def update_preferences(
    *,
    db: Session = Depends(get_db),
    prefs_in: NotificationPreferenceUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Update notification preferences.
    """
    prefs = db.query(NotificationPreference).filter(NotificationPreference.user_id == current_user.id).first()
    if not prefs:
        prefs = NotificationPreference(user_id=current_user.id)
        db.add(prefs)
        
    update_data = prefs_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(prefs, field, value)
        
    db.commit()
    db.refresh(prefs)
    return prefs

@router.get("/", response_model=List[AlertResponse])
def get_user_alerts(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 50,
    unread_only: bool = False,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get alerts for the current user.
    """
    query = db.query(Alert).filter(Alert.user_id == current_user.id)
    if unread_only:
        query = query.filter(Alert.is_read == False)
        
    alerts = query.order_by(Alert.created_at.desc()).offset(skip).limit(limit).all()
    return alerts

@router.post("/{alert_id}/read", response_model=AlertResponse)
def mark_alert_read(
    alert_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Mark a specific alert as read.
    """
    alert = db.query(Alert).filter(Alert.id == alert_id, Alert.user_id == current_user.id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
        
    alert.is_read = True
    db.commit()
    db.refresh(alert)
    return alert
