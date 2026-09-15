from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.user import User
from models.farm import Farm
from core.pdf_generator import report_generator
from services.statistics_service import statistics_service

router = APIRouter()

@router.get("/farm/{farm_id}/summary", response_class=HTMLResponse)
def get_farm_summary_report(
    farm_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Generate an HTML report summarizing the farm's health.
    The frontend can print this to PDF or display it directly.
    """
    farm = db.query(Farm).filter(Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    if farm.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this farm")
        
    # Get aggregated stats
    stats = statistics_service.get_user_dashboard_stats(db, current_user.id)
    
    # Mock recent alerts for the report
    recent_alerts = [
        {"date": "2026-09-10", "message": "Early Blight detected in Tomato Plot A. Severity: Moderate."},
        {"date": "2026-09-12", "message": "High humidity warnings issued for the next 3 days."}
    ]
    
    html_report = report_generator.generate_farm_summary_html(
        farm_name=farm.name,
        stats=stats,
        recent_alerts=recent_alerts
    )
    
    return html_report
