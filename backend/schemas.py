from pydantic import BaseModel


class EmployeeCreate(BaseModel):
    name: str
    email: str
    department: str


class Employee(EmployeeCreate):
    id: int