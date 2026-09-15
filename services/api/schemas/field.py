from pydantic import BaseModel
from typing import Optional
from datetime import date

# Shared properties
class FieldBase(BaseModel):
    name: str
    area: float
    crop_type: Optional[str] = None
    planting_date: Optional[date] = None
    expected_harvest_date: Optional[date] = None

# Properties to receive on field creation
class FieldCreate(FieldBase):
    farm_id: int

# Properties to receive on field update
class FieldUpdate(FieldBase):
    name: Optional[str] = None
    area: Optional[float] = None

# Properties to return to client
class FieldResponse(FieldBase):
    id: int
    farm_id: int

    class Config:
        from_attributes = True

# Schema for Health Timeline History
class FieldHistoryResponse(BaseModel):
    date: str
    event_type: str
    description: str
    severity: Optional[str] = None
    image_url: Optional[str] = None
