from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime

from api import deps
from db.database import get_db
from models.user import User
from models.sensor import Sensor, SensorReading
from schemas.sensor import SensorCreate, SensorResponse, SensorReadingCreate, SensorReadingResponse

router = APIRouter()

@router.post("/register", response_model=SensorResponse)
def register_sensor(
    *,
    db: Session = Depends(get_db),
    sensor_in: SensorCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Register a new hardware sensor to a specific field.
    """
    existing = db.query(Sensor).filter(Sensor.device_uid == sensor_in.device_uid).first()
    if existing:
        raise HTTPException(status_code=400, detail="Sensor device_uid already registered.")
        
    db_sensor = Sensor(
        device_uid=sensor_in.device_uid,
        sensor_type=sensor_in.sensor_type,
        field_id=sensor_in.field_id,
        is_active=sensor_in.is_active
    )
    db.add(db_sensor)
    db.commit()
    db.refresh(db_sensor)
    return db_sensor

@router.post("/ingest", status_code=202)
def ingest_sensor_reading(
    *,
    db: Session = Depends(get_db),
    reading_in: SensorReadingCreate,
    # In production, sensors use a lightweight API Key or mutual TLS, not user JWTs.
    # We bypass auth here to simulate an internal IoT ingestion webhook.
) -> Any:
    """
    High-frequency IoT data ingestion endpoint.
    Hardware devices call this to report soil moisture, temp, etc.
    """
    sensor = db.query(Sensor).filter(Sensor.device_uid == reading_in.device_uid).first()
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not recognized.")
        
    if reading_in.battery_level is not None:
        sensor.battery_level = reading_in.battery_level
        db.add(sensor)
        
    db_reading = SensorReading(
        sensor_id=sensor.id,
        value=reading_in.value,
        unit=reading_in.unit,
        recorded_at=reading_in.recorded_at or datetime.utcnow()
    )
    db.add(db_reading)
    db.commit()
    
    # In a full system, you would trigger a BackgroundTask here to check if the 
    # soil moisture dropped below a threshold and auto-create an Irrigation Task.
    
    return {"status": "accepted"}

@router.get("/field/{field_id}/readings", response_model=List[SensorReadingResponse])
def get_field_sensor_readings(
    field_id: int,
    db: Session = Depends(get_db),
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Retrieve historical sensor data for a field to plot on the UI.
    """
    sensors = db.query(Sensor).filter(Sensor.field_id == field_id).all()
    sensor_ids = [s.id for s in sensors]
    
    readings = db.query(SensorReading)\
                 .filter(SensorReading.sensor_id.in_(sensor_ids))\
                 .order_by(SensorReading.recorded_at.desc())\
                 .limit(limit)\
                 .all()
                 
    return readings
