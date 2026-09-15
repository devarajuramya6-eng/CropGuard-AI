from pydantic import BaseModel
from typing import Optional, List

class DiseaseBase(BaseModel):
    name: str
    scientific_name: Optional[str] = None
    description: str
    symptoms: Optional[str] = None
    causes: Optional[str] = None
    prevention: Optional[str] = None
    treatment_advisory: Optional[str] = "Please consult a qualified agricultural expert for specific chemical dosages."

class DiseaseCreate(DiseaseBase):
    pass

class DiseaseResponse(DiseaseBase):
    id: int

    class Config:
        from_attributes = True
