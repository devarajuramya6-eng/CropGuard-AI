from sqlalchemy import Column, Integer, String, Boolean, Enum
from db.database import Base
import enum

class UserRole(str, enum.Enum):
    FARMER = "farmer"
    EXPERT = "expert"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    is_active = Column(Boolean(), default=True)
    role = Column(Enum(UserRole), default=UserRole.FARMER)
