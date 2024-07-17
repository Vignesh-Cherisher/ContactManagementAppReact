from typing import Optional
from fastapi import APIRouter, Depends, File, HTTPException, Request, Response, UploadFile
from starlette import status
from pydantic import EmailStr, Field, BaseModel
from errors import UnknownContactException
from test_minio import store_image
from pymongo.collection import Collection

class ContactItemModel(BaseModel):
  id:int
  fName:str = Field(min_length=3, max_length=20, pattern=r'^[A-Za-z\s]+$')
  lName:Optional[str] = Field(min_length=3, max_length=20, pattern=r'^[A-Za-z\s]+$')
  email: str = Field(pattern=r'^email\d+$')
  phone: str = Field(pattern=r'^phone\d+$')
  dob: Optional[str] = Field(pattern=r'\d{2}-\d{2}-\d{4}')
  isFav:bool
  address:Optional[str] = Field(min_length=3, max_length=100)
  url: Optional[str]
  
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
  home: Optional[str] = Field(min_length=4, max_length=13, description="Home phone number, must be 4 to 13 digits.")
  work: Optional[str] = Field(min_length=4, max_length=13, description="Work phone number, must be 4 to 13 digits.")
  main: Optional[str] = Field(min_length=4, max_length=13, description="Main phone number, must be 4 to 13 digits.")
  other: Optional[str] = Field(min_length=4, max_length=13, description="Other phone number, must be 4 to 13 digits.")
  
  class Config:
    json_schema_extra = {
      "examples": [
                {
                    "id": "phone123",
                    "home": "1234567",
                    "work": "2345678",
                    "main": "3456789",
                    "other": "4567890"
                },
                {
                    "id": "phone456",
                    "home": "9876543",
                    "work": "8765432",
                    "main": "7654321",
                    "other": "6543210"
                }
      ]
    }
    
class EmailItemModel(BaseModel):
  id: str = Field(pattern=r'^email\d+$', description="Unique identifier for the contact, must start with 'email' followed by digits.")
  personal: Optional[EmailStr] 
  work: Optional[EmailStr]
  
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
  from main import app
  return app.mongodb

def update_model(collection_array, object_key_array, post_request):
  for i in range(3):
    collection_array[i].update_one({"_id": post_request[object_key_array[i]].id}, {"$unset": {"id": ""}})
        
def process_contact_model(contact_model, profile_img):
  if(profile_img.filename != 'default-image.jpg'):
    contact_model= store_image(profile_img, contact_model)
  return contact_model

@router.get('/contact-list', status_code=status.HTTP_200_OK)
def get_contacts(db = Depends(get_db)):
    contacts_collection: Collection = db['contacts']
    results = contacts_collection.find({})
    contacts = {}
    for contact in results:
        contact_id = str(contact.pop("_id"))
        contact['id'] = contact_id
        contacts[contact_id] = contact
    return contacts

@router.post('/upsert', status_code=status.HTTP_200_OK)
def create_contact(post_request: PostRequest, db=Depends(get_db)):
  contact_collection: Collection = db['contacts']
  phone_collection: Collection = db['phones']
  email_collection: Collection = db['emails']
  
  try:
    contact_collection.update_one({"_id": post_request.contact.id}, {"$set": dict(post_request.contact)},upsert= True)
    phone_collection.update_one({"_id": post_request.phoneGroup.id}, {"$set": dict(post_request.phoneGroup)}, upsert = True)
    email_collection.update_one({"_id": post_request.emailGroup.id}, {"$set": dict(post_request.emailGroup)}, upsert = True)
    update_model([contact_collection,phone_collection,email_collection],["contact","phoneGroup","emailGroup"], dict(post_request))
  except Exception as e:
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))    
  return 'Success'

@router.post('/image/{contact_id}', status_code=status.HTTP_200_OK)
def update_profile_image(contact_id:str, profile_image:UploadFile = File(...), db=Depends(get_db)):
  contact_model = db['contacts'].find_one({"_id": int(contact_id)})
  processed_model = process_contact_model(contact_model, profile_image)
  try:
    db['contacts'].update_one({"_id": int(contact_id)}, {"$set": {"url": processed_model['url']}})
  except Exception as e:
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
  return 'Success'
  

@router.delete('/{contact_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(contact_id: str, response: Response, db=Depends(get_db)):
  contact_collection = db['contacts']
  contact_model = contact_collection.find_one({"_id": int(contact_id)})
  if contact_model is None:
    raise UnknownContactException(id = contact_id)
  db['phones'].delete_one({"_id": contact_model['phone']})
  db['emails'].delete_one({"_id": contact_model['email']})
  delete_result = contact_collection.delete_one({"_id": int(contact_id)})
  
  if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response