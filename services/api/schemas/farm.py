from pydantic import BaseModel
from typing import Optional

# Shared properties
class FarmBase(BaseModel):
    name: str
    location: Optional[str] = None
    area: Optional[float] = None
    soil_type: Optional[str] = None
    irrigation_type: Optional[str] = None

# Properties to receive on farm creation
class FarmCreate(FarmBase):
    pass

# Properties to receive on farm update
class FarmUpdate(FarmBase):
    name: Optional[str] = None

# Properties to return to client
class FarmResponse(FarmBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True
