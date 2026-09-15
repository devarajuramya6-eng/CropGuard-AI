from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class SyncOperationCreate(BaseModel):
    client_uuid: str
    entity_type: str
    action: str
    payload: Dict[str, Any]
    client_timestamp: datetime

class SyncBatchRequest(BaseModel):
    operations: List[SyncOperationCreate]

class SyncOperationResponse(BaseModel):
    client_uuid: str
    status: str
    message: Optional[str] = None
    server_id: Optional[int] = None # The ID generated on the server if CREATE

class SyncBatchResponse(BaseModel):
    results: List[SyncOperationResponse]
