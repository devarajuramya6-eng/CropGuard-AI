from pydantic import BaseModel
from typing import Optional

# Shared properties
class CropBase(BaseModel):
    name: str
    scientific_name: Optional[str] = None
    description: Optional[str] = None
    environmental_requirements: Optional[str] = None

# Properties to receive on creation
class CropCreate(CropBase):
    pass

# Properties to receive on update
class CropUpdate(CropBase):
    name: Optional[str] = None

# Properties to return to client
class CropResponse(CropBase):
    id: int

    class Config:
        from_attributes = True
