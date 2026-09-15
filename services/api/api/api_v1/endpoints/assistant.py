from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from api import deps
from db.database import get_db
from models.user import User
from models.assistant import AssistantConversation, AssistantMessage
from services.assistant_engine import assistant_engine

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    conversation_id: int = None # Optional: creates new if None

class ChatResponse(BaseModel):
    conversation_id: int
    response: str

@router.post("/chat", response_model=ChatResponse)
def chat_with_assistant(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Send a message to the AI Agriculture Assistant.
    """
    conv_id = request.conversation_id
    
    # 1. Resolve Conversation
    if not conv_id:
        new_conv = AssistantConversation(user_id=current_user.id)
        db.add(new_conv)
        db.commit()
        db.refresh(new_conv)
        conv_id = new_conv.id
    else:
        # Validate ownership
        conv = db.query(AssistantConversation).filter(
            AssistantConversation.id == conv_id, 
            AssistantConversation.user_id == current_user.id
        ).first()
        if not conv:
            raise HTTPException(status_code=404, detail="Conversation not found")
            
    # 2. Save User Message
    user_msg = AssistantMessage(conversation_id=conv_id, role="user", content=request.query)
    db.add(user_msg)
    
    # 3. Process Context-Aware Response
    ai_response_text = assistant_engine.process_query(current_user.id, request.query, db)
    
    # 4. Save AI Message
    ai_msg = AssistantMessage(conversation_id=conv_id, role="assistant", content=ai_response_text)
    db.add(ai_msg)
    db.commit()
    
    return {
        "conversation_id": conv_id,
        "response": ai_response_text
    }
