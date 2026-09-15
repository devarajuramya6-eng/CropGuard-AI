from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

class WebhookSubscriptionBase(BaseModel):
    target_url: HttpUrl
    secret_key: Optional[str] = None
    events: str = "*" # Comma separated list of events
    is_active: bool = True

class WebhookSubscriptionCreate(WebhookSubscriptionBase):
    pass

class WebhookSubscriptionResponse(WebhookSubscriptionBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
