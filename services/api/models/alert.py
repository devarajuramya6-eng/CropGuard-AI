from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, func, JSON
from db.database import Base

class NotificationPreference(Base):
    __tablename__ = "notification_preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    
    # Preference toggles
    disease_alerts = Column(Boolean, default=True)
    weather_alerts = Column(Boolean, default=True)
    inspection_reminders = Column(Boolean, default=False)
    
    # Delivery methods
    email_enabled = Column(Boolean, default=True)
    push_enabled = Column(Boolean, default=True)
    sms_enabled = Column(Boolean, default=False)
    
    quiet_hours_start = Column(String, default="22:00") # 10 PM
    quiet_hours_end = Column(String, default="06:00") # 6 AM

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    alert_type = Column(String, nullable=False) # e.g., 'DISEASE', 'WEATHER', 'SYSTEM'
    severity = Column(String, default="INFO") # INFO, WARNING, CRITICAL
    
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Optional context mapping (e.g. which field or farm triggered this)
    context_data = Column(JSON, nullable=True)
