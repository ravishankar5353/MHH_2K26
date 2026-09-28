from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="DealMind Backend",
    description="Memory-powered Sales Deal Intelligence Agent Backend powered by Hindsight Memory",
    version="1.0.0"
)

# Allowed CORS origins
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    os.getenv("FRONTEND_URL", "http://localhost:3000")
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
    return {
        "status": "ok",
        "service": "DealMind API"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
