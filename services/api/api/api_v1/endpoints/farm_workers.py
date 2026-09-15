from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.user import User
from models.farm import Farm
from models.farm_worker import FarmWorker
from schemas.farm_worker import FarmWorkerInvite, FarmWorkerResponse

router = APIRouter()

@router.post("/invite", response_model=FarmWorkerResponse)
def invite_worker(
    *,
    db: Session = Depends(get_db),
    invite_in: FarmWorkerInvite,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Farm owner invites a worker by email.
    """
    farm = db.query(Farm).filter(Farm.id == invite_in.farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
        
    if farm.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the farm owner can invite workers")
        
    target_user = db.query(User).filter(User.email == invite_in.worker_email).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="User with this email not found in system. They must register first.")
        
    existing_link = db.query(FarmWorker).filter(FarmWorker.farm_id == farm.id, FarmWorker.user_id == target_user.id).first()
    if existing_link:
        raise HTTPException(status_code=400, detail="Worker is already assigned to this farm")
        
    db_worker = FarmWorker(
        farm_id=farm.id,
        user_id=target_user.id,
        role=invite_in.role.upper(),
        is_accepted=False # Requires worker to accept
    )
    db.add(db_worker)
    db.commit()
    db.refresh(db_worker)
    return db_worker

@router.get("/my-invites", response_model=List[FarmWorkerResponse])
def get_my_invites(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get list of farms the current user has been invited to.
    """
    invites = db.query(FarmWorker).filter(FarmWorker.user_id == current_user.id).all()
    return invites

@router.post("/{assignment_id}/accept")
def accept_invite(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Worker accepts a farm invitation.
    """
    assignment = db.query(FarmWorker).filter(FarmWorker.id == assignment_id, FarmWorker.user_id == current_user.id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Invitation not found")
        
    assignment.is_accepted = True
    db.commit()
    return {"message": "Invitation accepted successfully"}
