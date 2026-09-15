from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table
from sqlalchemy.orm import relationship
from db.database import Base

# Association table for Many-to-Many between Crops and Diseases
crop_disease_association = Table(
    'crop_disease',
    Base.metadata,
    Column('crop_id', Integer, ForeignKey('crops_catalog.id')),
    Column('disease_id', Integer, ForeignKey('diseases.id'))
)

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    scientific_name = Column(String)
    
    # Core Knowledge Base text blocks
    description = Column(Text, nullable=False)
    symptoms = Column(Text)
    causes = Column(Text)
    prevention = Column(Text)
    treatment_advisory = Column(Text, nullable=True) # "Please consult a qualified agricultural expert."
    
    # Relationships
    affected_crops = relationship(
        "Crop", 
        secondary=crop_disease_association, 
        backref="susceptible_diseases"
    )
