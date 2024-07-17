from fastapi import APIRouter
from fastapi import Depends
from fastapi import Path
from starlette import status
from errors import InvalidDataTypeException

router = APIRouter(
  prefix='/phone',
  tags=['phone']
)

def get_db():
    from main import app
    return app.mongodb

@router.get('/{phone_id}', status_code=status.HTTP_200_OK)
def read_phone_list(db=Depends(get_db), phone_id: str = Path(pattern=r'^\d+$')):
  query_id = 'phone' + phone_id
  phone_model = db['phones'].find_one({"_id": query_id})
  phone_dict = dict(phone_model)
  phone_dict["id"] = phone_dict.pop("_id")
  
  if(type(phone_dict["home"]) == int):
    raise InvalidDataTypeException()
  return phone_dict
