from fastapi import FastAPI
from core.config import settings
from api.api_v1.api import api_router
from db.database import engine, Base

# Create tables for dev (In production, use alembic migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "Welcome to AgriGuard AI API"}
