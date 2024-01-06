import requests
# import pyrebase
# import pyrebase4
import firebase_admin
from firebase_admin import credentials, storage
import os

cred = credentials.Certificate(
    'healthcareapp-ad83b-firebase-adminsdk-l0iit-f59d50590b.json')

firebase_admin.initialize_app(cred, {
    'storageBucket': 'healthcareapp-ad83b.appspot.com'
})

# Define the directory inside flask-server where files will be downloaded
local_directory = './downloads/'

# Ensure the directory exists
if not os.path.exists(local_directory):
    os.makedirs(local_directory)


def download_patient_files(patient_name):
    # Reference to your Storage bucket
    bucket = storage.bucket()

    # Specify the folder path in Firebase Storage using patient_name
    folder_path_in_firebase = f'{patient_name}/'

    # List all files in the specified folder
    blobs = bucket.list_blobs(prefix=folder_path_in_firebase)

    # Iterate through each file and download
    for blob in blobs:
        # Skip if the blob is a 'folder'
        if blob.name.endswith('/'):
            continue

        # Define local file path
        local_file_path = os.path.join(
            local_directory, os.path.basename(blob.name))

        # Download the file
        blob.download_to_filename(local_file_path)
        print(f'File {blob.name} downloaded to {local_file_path}')
