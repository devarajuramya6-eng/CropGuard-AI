from fastapi import APIRouter
from api.api_v1.endpoints import auth, farms, fields, crops, images, diseases, weather, risk, alerts, assistant, voice, profile

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(farms.router, prefix="/farms", tags=["farms"])
api_router.include_router(fields.router, prefix="/fields", tags=["fields"])
api_router.include_router(crops.router, prefix="/crops", tags=["crops"])
api_router.include_router(images.router, prefix="/images", tags=["images"])
api_router.include_router(diseases.router, prefix="/diseases", tags=["knowledge-base"])
api_router.include_router(weather.router, prefix="/weather", tags=["weather"])
api_router.include_router(risk.router, prefix="/risk", tags=["risk"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(assistant.router, prefix="/assistant", tags=["assistant"])
api_router.include_router(voice.router, prefix="/voice", tags=["voice"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
