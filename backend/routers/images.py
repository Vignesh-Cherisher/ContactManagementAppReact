import os
from typing import Annotated
from fastapi import APIRouter, HTTPException
from fastapi import Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal

UPLOAD_DIR = 'profile_pics'

router = APIRouter(
  prefix='/images',
  tags=['images']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/{file_name}', status_code=status.HTTP_200_OK)
def read_phone_list(db: db_dependency, file_name: str):
  file_path = os.path.join(UPLOAD_DIR, file_name)
  if not os.path.exists(file_path):
    raise HTTPException(status_code=404, detail="Image not found")
  return StreamingResponse(open(file_path, "rb"), media_type="image/jpeg")