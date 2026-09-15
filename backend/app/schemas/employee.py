from pydantic import BaseModel, EmailStr
from typing import Optional


class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    department: Optional[str] = None
    city: Optional[str] = None


class EmployeeUpdate(BaseModel):
    name: str
    email: EmailStr
    department: Optional[str] = None
    city: Optional[str] = None


class EmployeeResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    department: Optional[str] = None
    city: Optional[str] = None

    class Config:
        from_attributes = True