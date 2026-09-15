from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, func, Boolean
from sqlalchemy.orm import relationship
from db.database import Base

class Sensor(Base):
    """
    Physical hardware device placed in a field.
    """
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id", ondelete="CASCADE"), nullable=False)
    
    device_uid = Column(String, unique=True, index=True, nullable=False) # e.g., MAC address
    sensor_type = Column(String, nullable=False) # e.g., 'SOIL_MOISTURE', 'TEMPERATURE', 'NPK'
    
    is_active = Column(Boolean, default=True)
    battery_level = Column(Float, nullable=True) # 0.0 to 100.0
    
    # Relationship to readings
    readings = relationship("SensorReading", backref="sensor")

class SensorReading(Base):
    """
    Time-series data point recorded by a sensor.
    """
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensors.id", ondelete="CASCADE"), nullable=False)
    
    # Generic value field; interpretation depends on sensor_type
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=False) # e.g., '%', '°C'
    
    recorded_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
