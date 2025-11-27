from pydantic import BaseModel, EmailStr
from datetime import date
from .user import UserRead

class PatientCreate(BaseModel):
    # role: str = "patient"
    fullName: str
    email: EmailStr
    password: str
    phone: str
    dateOfBirth: date
    gender: str
    emergencyContactName: str
    emergencyContactPhone: str
    address: str
    city: str
    state: str
    pincode: str
    aadharNumber: str      
    allergies: str | None = None


class PatientRead(BaseModel):
    user: UserRead
    address: str
    city: str
    state: str
    allergies: str | None = None
    
    class Config:
        from_attributes = True