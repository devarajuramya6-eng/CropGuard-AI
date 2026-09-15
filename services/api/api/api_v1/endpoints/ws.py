from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from core.websocket import ws_manager

router = APIRouter()

@router.websocket("/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    """
    Establish a WebSocket connection for real-time notifications.
    In production, user_id should be securely extracted from a JWT token passed
    in the initial handshake (e.g., query param or headers), not blindly trusted from the path.
    """
    await ws_manager.connect(websocket, user_id)
    try:
        # Acknowledge connection
        await ws_manager.send_personal_message(
            {"type": "SYSTEM", "message": "Connected to real-time alerting system."}, 
            user_id
        )
        
        while True:
            # Keep the connection open and listen for ping/pong if necessary
            data = await websocket.receive_text()
            # We generally push data down to the client, but could handle replies here
            
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, user_id)
