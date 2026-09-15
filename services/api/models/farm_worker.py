from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func, Boolean
from sqlalchemy.orm import relationship
from db.database import Base

class FarmWorker(Base):
    """
    Junction table for Role-Based Access Control (RBAC) at the Farm level.
    Allows an Owner to invite sub-users (Workers, Managers) to their farm.
    """
    __tablename__ = "farm_workers"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    # Access level: 'MANAGER', 'WORKER', 'VIEWER'
    role = Column(String, nullable=False, default="WORKER")
    
    # Status of invitation
    is_accepted = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships for easy ORM querying
    farm = relationship("Farm", backref="workers")
    user = relationship("User", backref="farm_employments")
