from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float
from db.database import Base

class ImageQualityResult(Base):
    __tablename__ = "image_quality_results"

    id = Column(Integer, primary_key=True, index=True)
    image_id = Column(Integer, ForeignKey("uploaded_images.id", ondelete="CASCADE"), unique=True)
    
    is_acceptable = Column(Boolean, default=True)
    blur_score = Column(Float)
    brightness_score = Column(Float)
    resolution_ok = Column(Boolean, default=True)
    
    rejection_reason = Column(String, nullable=True)
