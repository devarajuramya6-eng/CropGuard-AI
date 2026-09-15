from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

# Preferences
class NotificationPreferenceBase(BaseModel):
    disease_alerts: bool
    weather_alerts: bool
    inspection_reminders: bool
    email_enabled: bool
    push_enabled: bool
    sms_enabled: bool
    quiet_hours_start: str
    quiet_hours_end: str

class NotificationPreferenceUpdate(BaseModel):
    disease_alerts: Optional[bool] = None
    weather_alerts: Optional[bool] = None
    inspection_reminders: Optional[bool] = None
    email_enabled: Optional[bool] = None
    push_enabled: Optional[bool] = None
    sms_enabled: Optional[bool] = None
    quiet_hours_start: Optional[str] = None
    quiet_hours_end: Optional[str] = None

class NotificationPreferenceResponse(NotificationPreferenceBase):
    user_id: int
    class Config:
        from_attributes = True

# Alerts
class AlertResponse(BaseModel):
    id: int
    title: str
    message: str
    alert_type: str
    severity: str
    is_read: bool
    created_at: datetime
    context_data: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True
