import os
import shutil
from typing import Annotated, Optional
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy.orm import Session
from starlette import status
from errors import UnknownContactException
from database import SessionLocal
from models import Contacts, Phones, Emails
from pydantic import EmailStr, Field, BaseModel, FilePath

UPLOAD_DIRECTORY = 'profile_pics'

class ContactItemModel(BaseModel):
  id:int
  fName:str = Field(min_length=3, max_length=20, pattern=r'^[a-zA-Z]+$')
  lName:Optional[str] = Field(min_length=3, max_length=20, pattern=r'^[a-zA-Z]+$')
  email: str = Field(pattern=r'^email\d+$')
  phone: str = Field(pattern=r'^phone\d+$')
  dob: Optional[str] = Field(pattern=r'\d{2}-\d{2}-\d{4}')
  isFav:bool
  address:Optional[str] = Field(min_length=3, max_length=100)
  url: Optional[str] = Field(pattern=r'^http://\S*')
  
  class Config:
    json_schema_extra = {
      "examples":[
        {
          'id': 123,
          'fName': 'example',
          'lName': 'user',
          'email': 'email123',
          'phone': 'phone123',
          'dob': '01-01-1999',
          'isFav': False,
          'address': 'example, user, \n address',
          'url': 'https://example/user/profile/picture/url'
        }
      ]
    }
    
class PhoneItemModel(BaseModel):
  id: str = Field(pattern=r'^phone\d+$', description="Unique identifier for the contact, must start with 'phone' followed by digits.")
  home: Optional[int] = Field(gt=999, description="Home phone number, must be 4 to 13 digits.")
  work: Optional[int] = Field(gt=999, description="Work phone number, must be 4 to 13 digits.")
  main: Optional[int] = Field(gt=999, description="Main phone number, must be 4 to 13 digits.")
  other: Optional[int] = Field(gt=999, description="Other phone number, must be 4 to 13 digits.")
  
  class Config:
    json_schema_extra = {
      "examples": [
                {
                    "id": "phone123",
                    "home": 1234567,
                    "work": 2345678,
                    "main": 3456789,
                    "other": 4567890
                },
                {
                    "id": "phone456",
                    "home": 9876543,
                    "work": 8765432,
                    "main": 7654321,
                    "other": 6543210
                }
      ]
    }
    
class EmailItemModel(BaseModel):
  id: str = Field(pattern=r'^email\d+$', description="Unique identifier for the contact, must start with 'phone' followed by digits.")
  personal: Optional[EmailStr] = Field(description="Home phone number, must be 4 to 13 digits.")
  work: Optional[EmailStr] = Field(description="Work phone number, must be 4 to 13 digits.")
  
  class Config:
    json_schema_extra = {
      "examples": [
                {
                    "id": "email123",
                    "personal": "examplepersonal1@email.com",
                    "work": "examplework1@email.com",
                },
                {
                    "id": "email456",
                    "personal": "examplepersonal2@email.com",
                    "work": "examplework2@email.com",
                }
      ]
    }

class PostRequest(BaseModel):
  contact: ContactItemModel
  phoneGroup: PhoneItemModel
  emailGroup: EmailItemModel

router = APIRouter(
  prefix='/contacts',
  tags=['contacts']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency = Annotated[Session, Depends(get_db)]

def update_model(instance, data):
    for attr, value in data.items():
        setattr(instance, attr, value)
        
def process_contact_model(contact_model, profile_img):
  if(profile_img.filename != 'default-image.jpg'):
    file_path = os.path.join(UPLOAD_DIRECTORY, profile_img.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(profile_img.file, buffer)
    contact_model.url = f"http://127.0.0.1:8000/images/{profile_img.filename}"
  return contact_model

@router.get('/contact-list', status_code=status.HTTP_200_OK)
def get_contacts(db: db_dependency):
  return db.query(Contacts).all()

@router.post('/upsert', status_code=status.HTTP_200_OK)
def create_contact(db: db_dependency, post_request: PostRequest):
  request_contact = post_request.contact
  contact_model = db.query(Contacts).filter(Contacts.id == request_contact.id).first()
  if not contact_model:
    contact_model = Contacts(**post_request.contact.model_dump())
    phone_model = Phones(**post_request.phoneGroup.model_dump())
    email_model = Emails(**post_request.emailGroup.model_dump())
    email_model.id = request_contact.email
    phone_model.id = request_contact.phone
  else:
    phone_model = db.query(Phones).filter(Phones.id == request_contact.phone).first()
    email_model = db.query(Emails).filter(Emails.id == request_contact.email).first()
    update_model(contact_model, request_contact.model_dump())
    update_model(phone_model, post_request.phoneGroup.model_dump())
    update_model(email_model, post_request.emailGroup.model_dump())
  
  db.add(phone_model)
  db.add(email_model)
  db.add(contact_model)
  
  try:
        db.commit()
  except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))    
  return 'Success'

@router.post('/image/{contact_id}', status_code=status.HTTP_200_OK)
def update_profile_image(db: db_dependency, contact_id:str, profile_image:UploadFile = File(...)):
  contact_model = db.query(Contacts).filter(Contacts.id == contact_id).first()
  contact_model = process_contact_model(contact_model, profile_image)
  db.add(contact_model)
  try:
    db.commit()
  except Exception as e:
    db.rollback()
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
  return 'Success'
  

@router.delete('/{contact_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(db: db_dependency, contact_id: str):
  contact_model = db.query(Contacts).filter(Contacts.id == contact_id).first()
  if contact_model is None:
    raise UnknownContactException(id = contact_id)
    # raise HTTPException(status_code = 404, detail = 'Contact not found')
  db.query(Phones).filter(Phones.id == contact_model.phone).delete()
  db.query(Emails).filter(Emails.id == contact_model.email).delete()
  db.query(Contacts).filter(Contacts.id == contact_id).delete()
  db.commit()