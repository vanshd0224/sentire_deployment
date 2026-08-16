import pymongo

uri = "mongodb+srv://vgupta242004_db_user:PM9V8Modrfry6yRA@clusterbackend.dxe8poq.mongodb.net/sentire_db?retryWrites=true&w=majority&appName=Clusterbackend"

print("=== TESTING MONGODB ATLAS CONNECTION ===")
try:
    client = pymongo.MongoClient(uri, serverSelectionTimeoutMS=5000)
    db = client.get_database("sentire_db")
    colls = db.list_collection_names()
    print(f"CONNECTED SUCCESSFULLY TO MONGODB ATLAS!")
    print(f"Collections in 'sentire_db': {colls}")
except Exception as e:
    print(f"Connection test info: {e}")
