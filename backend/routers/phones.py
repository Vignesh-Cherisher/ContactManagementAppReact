from typing import Annotated
from fastapi import APIRouter
from fastapi import Depends
from fastapi import Path
from sqlalchemy.orm import Session
from starlette import status
from errors import InvalidDataTypeException
from database import SessionLocal
from models import Phones

router = APIRouter(
  prefix='/phone',
  tags=['phone']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/{phone_id}', status_code=status.HTTP_200_OK)
def read_phone_list(db: db_dependency, phone_id: str = Path(pattern=r'^\d+$')):
  query_id = 'phone' + phone_id
  phone_model =  db.query(Phones).filter(Phones.id == query_id).first()
  phone_dict = (phone_model.__dict__)
  phone_dict.pop('sno',None)
  phone_dict.pop('_sa_instance_state',None)
  
  if(type(phone_dict["home"]) == str):
    raise InvalidDataTypeException()
  return phone_dict
