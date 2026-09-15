from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.disease import Disease
from models.user import User
from schemas.disease import DiseaseCreate, DiseaseResponse

router = APIRouter()

@router.get("/", response_model=List[DiseaseResponse])
def get_disease_knowledge_base(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Search and retrieve information from the agricultural disease knowledge base.
    Farmers use this to read about prevention and symptoms.
    """
    diseases = db.query(Disease).offset(skip).limit(limit).all()
    return diseases

@router.post("/", response_model=DiseaseResponse)
def add_disease_to_knowledge_base(
    *,
    db: Session = Depends(get_db),
    disease_in: DiseaseCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Add a new disease to the knowledge base.
    Restricted to Admins or Experts in a fully implemented RBAC system.
    """
    if current_user.role not in ["admin", "expert"]:
        raise HTTPException(status_code=403, detail="Not authorized to modify knowledge base")
        
    disease = db.query(Disease).filter(Disease.name == disease_in.name).first()
    if disease:
        raise HTTPException(status_code=400, detail="Disease already exists in knowledge base")
        
    db_disease = Disease(
        name=disease_in.name,
        scientific_name=disease_in.scientific_name,
        description=disease_in.description,
        symptoms=disease_in.symptoms,
        causes=disease_in.causes,
        prevention=disease_in.prevention,
        treatment_advisory=disease_in.treatment_advisory
    )
    db.add(db_disease)
    db.commit()
    db.refresh(db_disease)
    return db_disease
