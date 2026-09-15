from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
import httpx

from api import deps
from db.database import get_db
from models.user import User
from models.webhook import WebhookSubscription
from schemas.webhook import WebhookSubscriptionCreate, WebhookSubscriptionResponse

router = APIRouter()

@router.get("/", response_model=List[WebhookSubscriptionResponse])
def list_webhooks(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    List all active webhooks for the user.
    """
    return db.query(WebhookSubscription).filter(WebhookSubscription.user_id == current_user.id).all()

@router.post("/", response_model=WebhookSubscriptionResponse)
def create_webhook(
    *,
    db: Session = Depends(get_db),
    webhook_in: WebhookSubscriptionCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Register a new webhook URL to receive events.
    """
    db_webhook = WebhookSubscription(
        user_id=current_user.id,
        target_url=str(webhook_in.target_url),
        secret_key=webhook_in.secret_key,
        events=webhook_in.events,
        is_active=webhook_in.is_active
    )
    db.add(db_webhook)
    db.commit()
    db.refresh(db_webhook)
    return db_webhook

@router.delete("/{webhook_id}")
def delete_webhook(
    webhook_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Delete a webhook subscription.
    """
    webhook = db.query(WebhookSubscription).filter(WebhookSubscription.id == webhook_id, WebhookSubscription.user_id == current_user.id).first()
    if not webhook:
        raise HTTPException(status_code=404, detail="Webhook not found")
        
    db.delete(webhook)
    db.commit()
    return {"message": "Webhook deleted"}

# --- Internal Utility Function ---
async def dispatch_webhook_event(db: Session, user_id: int, event_type: str, payload: dict):
    """
    Internal function to be called as a BackgroundTask when critical things happen 
    (e.g., in AI Inference service).
    """
    webhooks = db.query(WebhookSubscription).filter(
        WebhookSubscription.user_id == user_id,
        WebhookSubscription.is_active == True
    ).all()
    
    async with httpx.AsyncClient() as client:
        for wh in webhooks:
            # Simple filtering logic
            if wh.events == "*" or event_type in wh.events.split(","):
                try:
                    # In production, compute HMAC signature with wh.secret_key here
                    await client.post(wh.target_url, json={"event": event_type, "data": payload}, timeout=5.0)
                except Exception as e:
                    print(f"Webhook dispatch failed to {wh.target_url}: {e}")
