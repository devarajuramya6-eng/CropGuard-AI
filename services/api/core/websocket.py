from fastapi import WebSocket
from typing import Dict, List

class ConnectionManager:
    """
    Manages active WebSocket connections to push real-time alerts to farmers.
    """
    def __init__(self):
        # Maps user_id to a list of active WebSocket connections (e.g. multiple tabs/devices)
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)

    def disconnect(self, websocket: WebSocket, user_id: int):
        if user_id in self.active_connections:
            self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

    async def send_personal_message(self, message: dict, user_id: int):
        """
        Send a JSON payload to all active devices of a specific user.
        Used for pushing immediate AI Alerts or Sensor threshold breaches.
        """
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                try:
                    await connection.send_json(message)
                except Exception:
                    # Handle dead connections gracefully
                    pass

    async def broadcast(self, message: dict):
        """
        Send a payload to ALL connected users.
        Used for system-wide maintenance announcements.
        """
        for user_id, connections in self.active_connections.items():
            for connection in connections:
                try:
                    await connection.send_json(message)
                except Exception:
                    pass

# Singleton instance
ws_manager = ConnectionManager()
