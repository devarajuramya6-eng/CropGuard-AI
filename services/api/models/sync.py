from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON, Boolean, func
from db.database import Base

class SyncQueue(Base):
    __tablename__ = "sync_queue"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    client_uuid = Column(String, nullable=False, index=True) # Unique ID from the mobile device
    entity_type = Column(String, nullable=False) # e.g., 'FARM', 'FIELD', 'IMAGE'
    action = Column(String, nullable=False) # 'CREATE', 'UPDATE', 'DELETE'
    
    payload = Column(JSON, nullable=False) # The actual data
    
    client_timestamp = Column(DateTime, nullable=False) # When it happened offline
    server_timestamp = Column(DateTime(timezone=True), server_default=func.now()) # When it synced
    
    status = Column(String, default="PENDING") # PENDING, PROCESSED, CONFLICT, ERROR
    conflict_resolution = Column(String, nullable=True) # How it was resolved if conflicting
