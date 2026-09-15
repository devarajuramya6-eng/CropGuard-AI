from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, func
from db.database import Base

class DiseasePrediction(Base):
    __tablename__ = "disease_predictions"

    id = Column(Integer, primary_key=True, index=True)
    image_id = Column(Integer, ForeignKey("uploaded_images.id", ondelete="CASCADE"), unique=True)
    
    # ML Outputs
    predicted_disease = Column(String, nullable=False)
    confidence_score = Column(Float, nullable=False) # e.g., 0.85 for 85%
    severity = Column(String) # e.g., "Early", "Moderate", "Severe"
    
    # Explainability
    explanation = Column(String)
    limitations = Column(String)
    
    # Flags
    needs_expert_review = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
