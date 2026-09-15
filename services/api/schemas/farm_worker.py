from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class FarmWorkerInvite(BaseModel):
    farm_id: int
    worker_email: EmailStr
    role: str = "WORKER" # MANAGER, WORKER, VIEWER

class FarmWorkerResponse(BaseModel):
    id: int
    farm_id: int
    user_id: int
    role: str
    is_accepted: bool
    created_at: datetime

    class Config:
        from_attributes = True
