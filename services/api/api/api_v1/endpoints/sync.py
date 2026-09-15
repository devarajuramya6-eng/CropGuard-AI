from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json

from api import deps
from db.database import get_db
from models.user import User
from models.sync import SyncQueue
from models.farm import Farm
from models.field import Field
from schemas.sync import SyncBatchRequest, SyncBatchResponse, SyncOperationResponse

router = APIRouter()

@router.post("/", response_model=SyncBatchResponse)
def process_sync_batch(
    *,
    db: Session = Depends(get_db),
    sync_request: SyncBatchRequest,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Process a batch of offline operations from a mobile client.
    Handles basic conflict resolution (e.g. Last-Write-Wins or Ignore).
    """
    results = []
    
    for op in sync_request.operations:
        # Check if already processed (Idempotency)
        existing = db.query(SyncQueue).filter(SyncQueue.client_uuid == op.client_uuid).first()
        if existing and existing.status == "PROCESSED":
            results.append(SyncOperationResponse(
                client_uuid=op.client_uuid, 
                status="ALREADY_PROCESSED"
            ))
            continue
            
        # Log to SyncQueue
        sync_record = SyncQueue(
            user_id=current_user.id,
            client_uuid=op.client_uuid,
            entity_type=op.entity_type,
            action=op.action,
            payload=op.payload,
            client_timestamp=op.client_timestamp,
            status="PENDING"
        )
        db.add(sync_record)
        
        try:
            server_id = None
            
            # Simple Entity Processor Router
            if op.entity_type == "FARM" and op.action == "CREATE":
                new_farm = Farm(
                    name=op.payload.get("name"),
                    location=op.payload.get("location"),
                    owner_id=current_user.id
                )
                db.add(new_farm)
                db.flush() # Get ID without committing whole transaction yet
                server_id = new_farm.id
                sync_record.status = "PROCESSED"
                
            elif op.entity_type == "FARM" and op.action == "UPDATE":
                # Simulated Last-Write-Wins conflict resolution
                target_id = op.payload.get("server_id")
                farm = db.query(Farm).filter(Farm.id == target_id, Farm.owner_id == current_user.id).first()
                if farm:
                    farm.name = op.payload.get("name", farm.name)
                    db.add(farm)
                    sync_record.status = "PROCESSED"
                else:
                    sync_record.status = "ERROR"
                    sync_record.conflict_resolution = "Target not found or unauthorized"
            else:
                # Catch-all for unsupported types during Phase 19
                sync_record.status = "SKIPPED"
                
            db.commit()
            
            results.append(SyncOperationResponse(
                client_uuid=op.client_uuid,
                status=sync_record.status,
                server_id=server_id
            ))
            
        except Exception as e:
            db.rollback()
            sync_record.status = "ERROR"
            sync_record.conflict_resolution = str(e)
            db.add(sync_record)
            db.commit()
            
            results.append(SyncOperationResponse(
                client_uuid=op.client_uuid,
                status="ERROR",
                message="Sync processing failed"
            ))

    return SyncBatchResponse(results=results)
