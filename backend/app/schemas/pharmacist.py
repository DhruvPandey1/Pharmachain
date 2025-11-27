from pydantic import BaseModel, EmailStr
from datetime import date
from .user import UserRead

class PharmacistCreate(BaseModel):
    # role: str = "pharmacist"
    fullName: str
    email: EmailStr
    password: str
    phone: str
    dateOfBirth: date
    gender: str
    licenseNumber: str 
    qualification: str
    yearsOfExperience: int
    pharmacyName: str
    addressLine1: str
    addressLine2: str | None = None
    city: str
    state: str
    pincode: str
    gstNumber: str         
    aadharNumber: str    


class PharmacistRead(BaseModel):
    user: UserRead
    qualification: str
    pharmacyName: str
    
    class Config:
        from_attributes = True