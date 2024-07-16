from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from errors import InvalidDataTypeException, UnknownContactException

from routers import contacts, phones, emails, images

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=origins,
    allow_headers=origins,
)

@app.exception_handler(UnknownContactException)
async def unknown_contact_handler(request: Request, exc: UnknownContactException):
  return JSONResponse(
    status_code=404,
    content={"message": "Oops! Contact is not found!"}
  )
  
@app.exception_handler(InvalidDataTypeException)
async def unknown_contact_handler(request: Request, exc: InvalidDataTypeException):
  return JSONResponse(
    status_code=401,
    content={"message": "Oops! Phone number is in String format."}
  )

app.include_router(contacts.router)
# app.include_router(phones.router)
# app.include_router(emails.router)
# app.include_router(images.router)