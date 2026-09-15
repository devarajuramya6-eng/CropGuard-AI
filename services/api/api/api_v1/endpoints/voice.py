from typing import Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.user import User
from models.assistant import AssistantConversation, AssistantMessage
from core.voice import SpeechProvider, get_speech_provider
from services.assistant_engine import assistant_engine

router = APIRouter()

ALLOWED_AUDIO_TYPES = ["audio/webm", "audio/mp4", "audio/mpeg", "audio/wav"]

@router.post("/chat-audio")
def chat_with_voice_assistant(
    *,
    db: Session = Depends(get_db),
    audio_file: UploadFile = File(...),
    language_code: str = Form("en-US"), # Default to English, but UI can pass 'hi-IN', 'ta-IN', etc.
    conversation_id: int = Form(None),
    current_user: User = Depends(deps.get_current_active_user),
    speech_provider: SpeechProvider = Depends(get_speech_provider)
) -> Any:
    """
    Upload a voice note. The system will transcribe it in the specified language,
    feed it to the Assistant Engine, and return the response.
    """
    if audio_file.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(status_code=400, detail="Invalid audio format.")
        
    # 1. Transcribe Voice to Text
    transcription = speech_provider.transcribe(audio_file.file, language_code=language_code)
    
    # 2. Resolve Conversation
    conv_id = conversation_id
    if not conv_id:
        new_conv = AssistantConversation(user_id=current_user.id)
        db.add(new_conv)
        db.commit()
        db.refresh(new_conv)
        conv_id = new_conv.id
        
    # 3. Save User Message
    user_msg = AssistantMessage(conversation_id=conv_id, role="user", content=transcription)
    db.add(user_msg)
    
    # 4. Process Context-Aware Response
    ai_response_text = assistant_engine.process_query(current_user.id, transcription, db)
    
    # 5. Optional: Synthesize Text to Voice (Text-to-Speech)
    audio_response_url = speech_provider.synthesize(ai_response_text, language_code=language_code)
    
    # 6. Save AI Message
    ai_msg = AssistantMessage(conversation_id=conv_id, role="assistant", content=ai_response_text)
    db.add(ai_msg)
    db.commit()
    
    return {
        "conversation_id": conv_id,
        "recognized_text": transcription,
        "response_text": ai_response_text,
        "response_audio_url": audio_response_url,
        "language_used": language_code
    }
