"""AgriGuard AI Primary Application Entrypoint."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "services", "api"))

try:
    from main import app
except ImportError:
    from fastapi import FastAPI
    app = FastAPI(title="AgriGuard AI")

    @app.get("/")
    def root():
        return {"status": "online", "system": "AgriGuard AI Enterprise"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
