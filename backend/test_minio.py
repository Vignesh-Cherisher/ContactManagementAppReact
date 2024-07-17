import os
from xmlrpc.client import ResponseError
from fastapi import HTTPException
from minio import Minio
from minio.error import S3Error

MINIO_ENDPOINT = 'localhost:9000'
MINIO_ACCESS_KEY = 'rootuser'
MINIO_SECRET_KEY = 'password123'
MINIO_BUCKET_NAME = 'profile-images'

def store_image(profile_img, contact_model):
    # Create a client with the MinIO server playground, its access key
    # and secret key.
    client = Minio(MINIO_ENDPOINT,
        access_key=MINIO_ACCESS_KEY,
        secret_key=MINIO_SECRET_KEY,
        secure=False
    )

    # Make the bucket if it doesn't exist.
    found = client.bucket_exists(MINIO_BUCKET_NAME)
    if not found:
        client.make_bucket(MINIO_BUCKET_NAME)
        print("Created bucket", MINIO_BUCKET_NAME)
    else:
        print("Bucket", MINIO_BUCKET_NAME, "already exists")

    try:
        file_size = profile_img.file.seek(0, os.SEEK_END)
        profile_img.file.seek(0)
        file_name = profile_img.filename
        client.put_object(MINIO_BUCKET_NAME, file_name, profile_img.file,
                                length=file_size,
                                content_type='application/octet-stream')
    except ResponseError as err:
        print(err)
    
    contact_model['url'] = f"http://127.0.0.1:8000/{MINIO_BUCKET_NAME}/{file_name}"
    return contact_model

def get_profile_image(image_name: str):
    client = Minio(MINIO_ENDPOINT,
        access_key=MINIO_ACCESS_KEY,
        secret_key=MINIO_SECRET_KEY,
        secure=False
    )
    
    try:
        response = client.get_object(MINIO_BUCKET_NAME, image_name)
    except S3Error as exc:
        raise HTTPException(status_code=404, detail="Image not found") from exc
    return response