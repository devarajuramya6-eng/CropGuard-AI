from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from api import deps
from db.database import get_db
from models.user import User
from models.inventory import InventoryItem
from schemas.inventory import InventoryItemCreate, InventoryItemUpdate, InventoryItemResponse

router = APIRouter()

@router.get("/", response_model=List[InventoryItemResponse])
def get_inventory(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get inventory items for the current user. Optionally filter by category.
    """
    query = db.query(InventoryItem).filter(InventoryItem.user_id == current_user.id)
    if category:
        query = query.filter(InventoryItem.category == category)
        
    items = query.offset(skip).limit(limit).all()
    return items

@router.post("/", response_model=InventoryItemResponse)
def add_inventory_item(
    *,
    db: Session = Depends(get_db),
    item_in: InventoryItemCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Add new equipment, chemicals, or seeds to the inventory.
    """
    db_item = InventoryItem(
        user_id=current_user.id,
        farm_id=item_in.farm_id,
        name=item_in.name,
        category=item_in.category,
        quantity=item_in.quantity,
        unit=item_in.unit,
        description=item_in.description
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=InventoryItemResponse)
def update_inventory_item(
    item_id: int,
    *,
    db: Session = Depends(get_db),
    item_in: InventoryItemUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Update inventory quantity or details.
    """
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id, InventoryItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    update_data = item_in.model_dump(exclude_unset=True)
    
    # If quantity is updated, stamp last_restocked
    if "quantity" in update_data and update_data["quantity"] > item.quantity:
        item.last_restocked = datetime.utcnow()
        
    for field, value in update_data.items():
        setattr(item, field, value)
        
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{item_id}")
def delete_inventory_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Remove an item from inventory entirely.
    """
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id, InventoryItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    db.delete(item)
    db.commit()
    return {"message": "Inventory item deleted"}
