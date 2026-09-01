from sqlalchemy.orm import Session
from models import Employee


def get_all_employees(db: Session):
    return db.query(Employee).all()


def create_employee(
    db: Session,
    name: str,
    email: str,
    department: str
):
    employee = Employee(
        name=name,
        email=email,
        department=department
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    return employee


def delete_employee(db: Session, employee_id: int):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        return None

    db.delete(employee)
    db.commit()

    return employee