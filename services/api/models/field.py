from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from db.database import Base

class Field(Base):
    __tablename__ = "fields"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    area = Column(Float, nullable=False)
    crop_type = Column(String)  # Will link to crops table later
    planting_date = Column(Date)
    expected_harvest_date = Column(Date)
    
    # Associate the field with a farm
    farm_id = Column(Integer, ForeignKey("farms.id", ondelete="CASCADE"), nullable=False)
    
    # Relationships
    farm = relationship("Farm", backref="fields")
