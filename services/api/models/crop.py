from sqlalchemy import Column, Integer, String, Text
from db.database import Base

class Crop(Base):
    __tablename__ = "crops_catalog"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    scientific_name = Column(String)
    description = Column(Text)
    environmental_requirements = Column(Text)
    
    # Growth stages and common diseases will be linked via separate relationship tables
    # as the architecture scales, but this forms the core catalog entity.
