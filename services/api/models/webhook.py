from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, func
from db.database import Base

class WebhookSubscription(Base):
    """
    Registry for external integrations (ERP, SMS gateways, etc).
    """
    __tablename__ = "webhook_subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    target_url = Column(String, nullable=False)
    secret_key = Column(String, nullable=True) # Used to compute HMAC signature for security
    
    # Event filtering
    events = Column(String, nullable=False, default="*") # e.g., 'DISEASE_ALERT', 'TASK_COMPLETED'
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
