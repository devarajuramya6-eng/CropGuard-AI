from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class SensorBase(BaseModel):
    device_uid: str
    sensor_type: str
    field_id: int
    is_active: Optional[bool] = True

class SensorCreate(SensorBase):
    pass

class SensorResponse(SensorBase):
    id: int
    battery_level: Optional[float] = None

    class Config:
        from_attributes = True

# Readings
class SensorReadingCreate(BaseModel):
    device_uid: str
    value: float
    unit: str
    # recorded_at can be passed if the device batched offline data
    recorded_at: Optional[datetime] = None
    battery_level: Optional[float] = None

class SensorReadingResponse(BaseModel):
    id: int
    sensor_id: int
    value: float
    unit: str
    recorded_at: datetime

    class Config:
        from_attributes = True
