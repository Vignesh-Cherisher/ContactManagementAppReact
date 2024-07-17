from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from starlette import status
from test_minio import get_profile_image  

UPLOAD_DIR = 'profile_pics'

router = APIRouter(
  prefix='/profile-images',
  tags=['profile-images']
)

@router.get('/{file_name}', status_code=status.HTTP_200_OK)
async def stream_profile_image(file_name: str):
  response = get_profile_image(file_name)
  return StreamingResponse(response, media_type="image/jpeg")