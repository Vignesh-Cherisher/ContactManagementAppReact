import os
from typing import Annotated
from fastapi import APIRouter, HTTPException
from fastapi import Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from test_minio import get_profile_image  

UPLOAD_DIR = 'profile_pics'

router = APIRouter(
  prefix='/profile-images',
  tags=['profile-images']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/{file_name}', status_code=status.HTTP_200_OK)
async def stream_profile_image(file_name: str):
  response = get_profile_image(file_name)
  return StreamingResponse(response, media_type="image/jpeg")