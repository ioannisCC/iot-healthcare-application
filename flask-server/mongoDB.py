from datetime import datetime, timedelta
from pymongo.mongo_client import MongoClient
import time


def connection(retry_count=3):
    while retry_count > 0:
        try:
            client = MongoClient(
                "mongodb+srv://iot:tLn7YmTz32WgyOAA@healthcareapp.nyr6sdb.mongodb.net/?retryWrites=true&w=majority",
                connectTimeoutMS=30000,   # 30 seconds
                socketTimeoutMS=45000
            )
            db = client['HealthCareApp']
            collection = db['patientDetections']

            return client, collection

        except:
            retry_count -= 1
            print("Retrying connection...")
            time.sleep(1)  # Wait for a short period before retrying

    print("Failed to connect to MongoDB after several attempts")


def pushData(patient_name, probability_scores_str):
    try:
        client, collection = connection()
        creatorDocument = {
            "patient_name": patient_name,
            "probability_scores": probability_scores_str,
            "detection_date": datetime.now()
        }
        collection.insert_one(creatorDocument)
        client.close()
    except:
        print("Did not push data for: " + patient_name + "!!!\n")


def pullData(username):
    client, collection = connection()
    if not client:
        print("No valid MongoDB client, (pullData).")
        return 0

    try:
        retrieved_document = collection.find_one({"username": username})
        if retrieved_document:
            print("Retrieved Document/Creator:")
            print(retrieved_document)
            return 1
        else:
            print(f"No document found for username: {username}")
            return 0
    except Exception as e:
        print(f"An error occurred while fetching data: {e}")
        return 0
    finally:
        client.close()
