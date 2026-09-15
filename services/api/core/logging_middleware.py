from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import time
import json
from db.database import SessionLocal
from models.audit_log import AuditLog

class AuditLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Process the request
        response = await call_next(request)
        
        process_time = (time.time() - start_time) * 1000
        
        # Only log mutating actions or specific critical reads
        if request.method in ["POST", "PUT", "DELETE"]:
            # We skip logging raw passwords in /login route manually in a real env
            action_name = f"{request.method}_{request.url.path.strip('/').replace('/', '_').upper()}"
            
            # Simple heuristic to extract user_id if we appended it during auth
            # In FastAPI, standard middleware runs outside the Depends() scope,
            # so we'd typically rely on a background task or decoding the JWT here.
            # For architectural demonstration, we log the route activity.
            
            db = SessionLocal()
            try:
                log_entry = AuditLog(
                    action=action_name,
                    endpoint=request.url.path,
                    method=request.method,
                    status_code=response.status_code,
                    metadata_payload={
                        "client_ip": request.client.host if request.client else "unknown",
                        "process_time_ms": round(process_time, 2)
                    }
                )
                db.add(log_entry)
                db.commit()
            except Exception as e:
                # Never fail the user request just because logging failed
                print(f"Audit log failed: {e}")
            finally:
                db.close()
                
        return response
