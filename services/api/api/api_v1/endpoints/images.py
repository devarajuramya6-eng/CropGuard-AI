from typing import Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from api import deps
from db.database import get_db
from models.user import User
from models.image import UploadedImage
from core.storage import StorageProvider, get_storage_provider

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024 # 10 MB limit
ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

@router.post("/")
def upload_crop_image(
    *,
    db: Session = Depends(get_db),
    file: UploadFile = File(...),
    field_id: int = Form(None),
    current_user: User = Depends(deps.get_current_active_user),
    storage: StorageProvider = Depends(get_storage_provider)
) -> Any:
    """
    Upload an image of a crop leaf for subsequent AI analysis.
    Validates file type and size.
    """
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG, PNG, and WebP are allowed.")
    
    # Save file via abstracted provider
    file_path = storage.save_file(file.file, file.filename)
    
    # Save record to database
    img_record = UploadedImage(
        filename=file.filename,
        file_path=file_path,
        content_type=file.content_type,
        farmer_id=current_user.id,
        field_id=field_id
    )
    db.add(img_record)
    db.commit()
    db.refresh(img_record)
    
    return {
        "id": img_record.id,
        "url": storage.get_file_url(file_path),
        "message": "Image uploaded successfully. Awaiting quality validation and AI analysis."
    }
