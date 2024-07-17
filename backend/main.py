from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from errors import InvalidDataTypeException, UnknownContactException

import pymongo
from routers import contacts, phones, emails, images

MONGO_DETAILS = "mongodb://localhost:27017/"
client = pymongo.MongoClient(MONGO_DETAILS)
database = client["contact_manager"]

@asynccontextmanager
async def lifespan(app: FastAPI):
  app.mongodb = database
  yield
  client.close()
app = FastAPI(lifespan=lifespan)

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
    content={"message": f"Oops! Contact is not found! {exc}"}
  )
  
@app.exception_handler(InvalidDataTypeException)
async def unknown_contact_handler(request: Request, exc: InvalidDataTypeException):
  return JSONResponse(
    status_code=401,
    content={"message": "Oops! Phone number is in String format."}
  )

app.include_router(contacts.router)
app.include_router(phones.router)
app.include_router(emails.router)
app.include_router(images.router)