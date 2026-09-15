from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InventoryItemBase(BaseModel):
    name: str
    category: str
    quantity: float
    unit: str
    description: Optional[str] = None
    farm_id: Optional[int] = None

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    description: Optional[str] = None

class InventoryItemResponse(InventoryItemBase):
    id: int
    user_id: int
    last_restocked: datetime

    class Config:
        from_attributes = True
