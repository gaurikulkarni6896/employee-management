from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate


def create_employee(db: Session, employee_data: EmployeeCreate):
    employee = Employee(**employee_data.model_dump())

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


def get_employees(db: Session):
    return db.query(Employee).all()


def get_employee(db: Session, employee_id: int):
    return db.query(Employee).filter(
        Employee.id == employee_id
    ).first()


def update_employee(
    db: Session,
    employee_id: int,
    employee_data: EmployeeCreate
):
    employee = get_employee(db, employee_id)

    if not employee:
        return None

    data = employee_data.model_dump()

    for key, value in data.items():
        setattr(employee, key, value)

    db.commit()
    db.refresh(employee)

    return employee


def delete_employee(db: Session, employee_id: int):
    employee = get_employee(db, employee_id)

    if not employee:
        return None

    db.delete(employee)
    db.commit()

    return employee