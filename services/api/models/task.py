from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, func
from db.database import Base

class FarmTask(Base):
    __tablename__ = "farm_tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    field_id = Column(Integer, ForeignKey("fields.id", ondelete="CASCADE"), nullable=True) # Optional link to specific field
    
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    task_type = Column(String, nullable=False) # e.g., 'IRRIGATION', 'SPRAYING', 'HARVEST', 'INSPECTION'
    
    due_date = Column(DateTime, nullable=False)
    is_completed = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
