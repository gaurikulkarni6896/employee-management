from pydantic import BaseModel, EmailStr
from typing import Optional


class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    department: Optional[str] = None
    city: Optional[str] = None


class EmployeeResponse(EmployeeCreate):
    id: int

    class Config:
        from_attributes = True