from sqlalchemy import Column, Integer, String, DateTime, func, JSON
from db.database import Base

class AuditLog(Base):
    """
    Immutable ledger of system activity for security and debugging.
    """
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    
    # Optional because some actions happen before auth (e.g. login attempt)
    user_id = Column(Integer, nullable=True, index=True) 
    
    action = Column(String, nullable=False, index=True) # e.g. "CREATE_FARM", "LOGIN"
    endpoint = Column(String, nullable=False)
    method = Column(String, nullable=False)
    
    status_code = Column(Integer, nullable=False)
    
    # Contextual data (IP, request payload snippets, etc.)
    metadata_payload = Column(JSON, nullable=True)
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
