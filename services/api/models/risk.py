from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func, JSON
from db.database import Base

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"

    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id", ondelete="CASCADE"), nullable=False)
    
    overall_risk = Column(String, nullable=False) # Low, Moderate, High
    warnings = Column(JSON, nullable=True) # List of warning strings
    
    assessed_at = Column(DateTime(timezone=True), server_default=func.now())
