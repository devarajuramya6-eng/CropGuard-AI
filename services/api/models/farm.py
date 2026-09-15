from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base

class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    location = Column(String)
    area = Column(Float)
    soil_type = Column(String)
    irrigation_type = Column(String)
    
    # Associate the farm with an owner (User)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Using string 'User' avoids circular imports if relationships are resolved at runtime
    owner = relationship("User", backref="farms")
