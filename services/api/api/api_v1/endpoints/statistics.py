from typing import Any, Dict
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.user import User
from services.statistics_service import statistics_service

router = APIRouter()

@router.get("/dashboard", response_model=Dict[str, Any])
def get_dashboard_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Retrieve aggregated statistics for the main farmer dashboard.
    """
    stats = statistics_service.get_user_dashboard_stats(db, current_user.id)
    return stats
