from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from api import deps
from db.database import get_db
from models.user import User
from models.task import FarmTask
from schemas.task import TaskCreate, TaskUpdate, TaskResponse

router = APIRouter()

@router.get("/", response_model=List[TaskResponse])
def get_user_tasks(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    is_completed: bool = None,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Retrieve tasks for current user. Filter by completion status if provided.
    """
    query = db.query(FarmTask).filter(FarmTask.user_id == current_user.id)
    if is_completed is not None:
        query = query.filter(FarmTask.is_completed == is_completed)
        
    tasks = query.order_by(FarmTask.due_date.asc()).offset(skip).limit(limit).all()
    return tasks

@router.post("/", response_model=TaskResponse)
def create_task(
    *,
    db: Session = Depends(get_db),
    task_in: TaskCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Create a new agricultural task.
    """
    db_task = FarmTask(
        user_id=current_user.id,
        title=task_in.title,
        description=task_in.description,
        task_type=task_in.task_type,
        field_id=task_in.field_id,
        due_date=task_in.due_date
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    *,
    db: Session = Depends(get_db),
    task_in: TaskUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Update an existing task (e.g. mark as complete).
    """
    task = db.query(FarmTask).filter(FarmTask.id == task_id, FarmTask.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    update_data = task_in.model_dump(exclude_unset=True)
    
    # Handle completion logic automatically
    if "is_completed" in update_data:
        if update_data["is_completed"] and not task.is_completed:
            task.completed_at = datetime.utcnow()
        elif not update_data["is_completed"]:
            task.completed_at = None
            
    for field, value in update_data.items():
        setattr(task, field, value)
        
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Delete a task.
    """
    task = db.query(FarmTask).filter(FarmTask.id == task_id, FarmTask.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    db.delete(task)
    db.commit()
    return {"message": "Task successfully deleted"}
