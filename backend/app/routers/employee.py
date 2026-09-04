from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.employee import EmployeeResponse
from app.services import employee as employee_service

from app.services.employee import (
    create_employee,
    get_employees,
    get_employee,
    update_employee,
    delete_employee
)


router = APIRouter(
    prefix="/api/employees",
    tags=["Employees"]
)


@router.post("/", response_model=EmployeeResponse)
def create_employee_api(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):
    return create_employee(db, employee)


@router.get("/", response_model=list[EmployeeResponse])
def get_employees_api(
    db: Session = Depends(get_db)
):
    return get_employees(db)

@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = employee_service.get_employee(
        db,
        employee_id
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_employee_api(
    employee_id: int,
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):
    updated_employee = update_employee(
        db,
        employee_id,
        employee
    )

    if not updated_employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return updated_employee


@router.delete("/{employee_id}")
def delete_employee_api(
    employee_id: int,
    db: Session = Depends(get_db)
):
    deleted_employee = delete_employee(db, employee_id)

    if not deleted_employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {
        "message": "Employee deleted successfully"
    }