from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router
from app.memory.hindsight_service import hindsight_engine
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="DealMind Backend API",
    description="Memory-powered Sales Deal Intelligence Agent Backend powered by Hindsight Memory",
    version="1.0.0"
)

# Environment-based CORS configuration
cors_env = os.getenv("CORS_ORIGINS", "")
if cors_env:
    origins = [origin.strip() for origin in cors_env.split(",") if origin.strip()]
else:
    origins = [
        "https://frontend-liard-ten-36.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {
        "name": "DealMind Agent Backend",
        "tagline": "Every conversation remembered. Every deal smarter.",
        "status": "online",
        "hindsight_memory": "active"
    }

@app.get("/health")
@app.get("/api/health")
async def health_check():
    is_live = hindsight_engine.is_live()
    return {
        "status": "ok",
        "service": "DealMind API",
        "environment": os.getenv("ENVIRONMENT", "production"),
        "hindsight_status": "Connected (Live API)" if is_live else "Active (Hindsight Demo Engine)",
        "database": "Connected"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
