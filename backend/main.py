from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from errors import InvalidDataTypeException, UnknownContactException

import pymongo
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

MONGO_DETAILS = "mongodb://localhost:27017"
client = pymongo.MongoClient(MONGO_DETAILS)
database = client["contact_manager"]

@app.on_event("startup")
async def startup_db_client():
    app.mongodb = database

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

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