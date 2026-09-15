from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    
    # Global preferences
    preferred_language = Column(String, default="en-US") # Used by Voice Assistant and UI
    region = Column(String, nullable=True) # E.g., 'Maharashtra, India'
    
    # User relationship
    user = relationship("User", backref="profile")
