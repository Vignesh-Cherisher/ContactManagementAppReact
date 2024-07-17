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
    from main import app
    return app.mongodb

@router.get('/{email_id}', status_code=status.HTTP_200_OK)
def read_email_list(email_id: str = Path(pattern=r'^\d+$'), db = Depends(get_db)):
  query_id = 'email' + email_id
  email_model = db['emails'].find_one({"_id": query_id})
  email_dict = dict(email_model)
  email_dict["id"] = email_dict.pop("_id")
  return email_dict