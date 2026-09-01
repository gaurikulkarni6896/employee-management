from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db, create_table
from employee import (
    get_all_employees,
    create_employee,
    delete_employee
)

app = FastAPI()

# Allow Angular frontend to call FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
create_table()


@app.get("/")
def home():
    return {
        "message": "Employee API is running"
    }


@app.get("/api/employees")
def get_employees(db: Session = Depends(get_db)):

    return get_all_employees(db)


@app.post("/api/employees")
def add_employee(
    employee: dict,
    db: Session = Depends(get_db)
):

    return create_employee(
        db,
        employee["name"],
        employee["email"],
        employee["department"]
    )


@app.delete("/api/employees/{employee_id}")
def remove_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):

    employee = delete_employee(db, employee_id)

    if not employee:
        return {
            "message": "Employee not found"
        }

    return {
        "message": "Employee deleted successfully"
    }