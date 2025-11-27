from pydantic import BaseModel, EmailStr
from datetime import date
from .user import UserRead

class DoctorCreate(BaseModel):
    # role: str = "doctor"
    fullName: str
    email: EmailStr
    password: str
    phone: str
    dateOfBirth: date
    gender: str
    licenseNumber: str      
    speciality: str
    yearsOfExperience: int
    qualification: str
    hospitalName: str
    hospitalAddress: str
    city: str
    state: str
    pincode: str
    aadharNumber: str       
    panNumber: str          

class DoctorRead(BaseModel):
    user: UserRead  
    speciality: str
    qualification: str
    hospitalName: str
    
    class Config:
        from_attributes = True