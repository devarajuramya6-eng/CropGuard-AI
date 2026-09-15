from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, func
from db.database import Base

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    farm_id = Column(Integer, ForeignKey("farms.id", ondelete="CASCADE"), nullable=True)
    
    name = Column(String, nullable=False)
    category = Column(String, nullable=False) # e.g., 'CHEMICAL', 'FERTILIZER', 'SEED', 'TOOL', 'VEHICLE'
    
    # Quantity tracking
    quantity = Column(Float, default=0.0)
    unit = Column(String, nullable=False) # e.g., 'Liters', 'Kg', 'Units'
    
    # Optional metadata
    description = Column(String, nullable=True)
    last_restocked = Column(DateTime(timezone=True), server_default=func.now())
