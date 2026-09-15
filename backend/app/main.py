from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.employee import Employee
from app.models.user import User
from app.routers import auth, employee

Base.metadata.create_all(bind=engine)

app = FastAPI(title='Employee Management API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:4200'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(employee.router)
app.include_router(auth.router)

@app.get('/')
def root():
    return {'message': 'Employee Management System API is running'}

@app.get('/health')
def health():
    return {'status': 'ok'}
