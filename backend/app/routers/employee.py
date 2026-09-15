from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.employee import EmployeeCreate, EmployeeResponse
from app.services.employee import (
    create_employee,
    delete_employee,
    get_employee as get_employee_service,
    get_employees,
    update_employee,
)

router = APIRouter(prefix='/api/employees', tags=['Employees'])

@router.get('', response_model=list[EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return get_employees(db)

@router.post('', response_model=EmployeeResponse)
def create_employee_api(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return create_employee(db, employee)

@router.get('/{employee_id}', response_model=EmployeeResponse)
def get_employee_api(employee_id: int, db: Session = Depends(get_db)):
    employee = get_employee_service(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail='Employee not found')
    return employee

@router.put('/{employee_id}', response_model=EmployeeResponse)
def update_employee_api(employee_id: int, employee: EmployeeCreate, db: Session = Depends(get_db)):
    updated = update_employee(db, employee_id, employee)
    if not updated:
        raise HTTPException(status_code=404, detail='Employee not found')
    return updated

@router.delete('/{employee_id}')
def delete_employee_api(employee_id: int, db: Session = Depends(get_db)):
    deleted = delete_employee(db, employee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail='Employee not found')
    return {'message': 'Employee deleted successfully'}
