from typing import Annotated
from fastapi import APIRouter, Path
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from models import Emails
from database import SessionLocal

router = APIRouter(
  prefix='/emails',
  tags=['emails']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/{email_id}', status_code=status.HTTP_200_OK)
def read_phone_list(db: db_dependency, email_id: str = Path(pattern=r'^\d+$')):
  query_id = 'email' + email_id
  email_model = db.query(Emails).filter(Emails.id == query_id).first()
  email_dict = (email_model.__dict__)
  email_dict.pop('sno',None)
  email_dict.pop('_sa_instance_state',None)
  return email_dict