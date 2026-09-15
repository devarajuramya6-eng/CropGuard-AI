from fastapi import APIRouter
from api.api_v1.endpoints import auth, farms, fields, crops, images

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(farms.router, prefix="/farms", tags=["farms"])
api_router.include_router(fields.router, prefix="/fields", tags=["fields"])
api_router.include_router(crops.router, prefix="/crops", tags=["crops"])
api_router.include_router(images.router, prefix="/images", tags=["images"])
