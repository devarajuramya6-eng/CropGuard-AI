from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from db.database import Base

class UploadedImage(Base):
    __tablename__ = "uploaded_images"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    content_type = Column(String)
    file_size_bytes = Column(Integer)
    
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    farmer_id = Column(Integer, ForeignKey("users.id"))
    field_id = Column(Integer, ForeignKey("fields.id"), nullable=True) # Optional link to a specific field
