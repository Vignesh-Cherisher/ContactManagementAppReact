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
    found = client.bucket_exists(bucket_name)
    if not found:
        client.make_bucket(bucket_name)
        print("Created bucket", bucket_name)
    else:
        print("Bucket", bucket_name, "already exists")

    try:
        file_data = profile_img.file.read()
        file_size = profile_img.file.seek(0, os.SEEK_END)
        profile_img.file.seek(0)
        file_name = profile_img.filename
        minio_client.put_object(MINIO_BUCKET_NAME, file_name, profile_img.file,
                                length=file_size,
                                content_type='application/octet-stream')
    except ResponseError as err:
        print(err)
    
    contact_model.url = f"http://127.0.0.1:8000/{MINIO_BUCKET_NAME}/{file_name}"

if __name__ == "__main__":
    try:
        main()
    except S3Error as exc:
        print("error occurred.", exc)