from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Database models
from app.models.employee import Employee
from app.models.user import User


# API routers
from app.routers import employee as employee_router
from app.routers import auth as auth_router


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(employee_router.router)
app.include_router(auth_router.router)


@app.get("/")
def root():
    return {
        "message": "Employee Management System API is running"
    }