import json, time, math
from pymongo import MongoClient
from pymongo.errors import AutoReconnect, NetworkTimeout, ServerSelectionTimeoutError, ConnectionFailure

uri = "mongodb+srv://davidpeeler9_db_user:CS6220_poker@cs6220poker.qvj1rfd.mongodb.net/CS6220Poker?retryWrites=true&w=majority&appName=CS6220Poker"

client = MongoClient(
    uri,
    serverSelectionTimeoutMS=30000,
    connectTimeoutMS=30000,
    socketTimeoutMS=120000,
    maxPoolSize=10
)
db = client["CS6220Poker"]
coll = db["poker_bench"]

def load_jsonl(path):
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                yield json.loads(line)

def insert_with_retries(chunk, max_retries=5):
    delay = 1.0
    for attempt in range(1, max_retries + 1):
        try:
            coll.insert_many(chunk, ordered=False)
            return True
        except (AutoReconnect, NetworkTimeout, ConnectionFailure, ServerSelectionTimeoutError) as e:
            if attempt == max_retries:
                raise
            time.sleep(delay)
            delay = min(delay * 2, 15) 
    return False

BATCH_SIZE = 1000 
buffer = []
count = 0

client.admin.command("ping")

for doc in load_jsonl("poker_bench_train.jsonl"):
    buffer.append(doc)
    if len(buffer) >= BATCH_SIZE:
        insert_with_retries(buffer)
        count += len(buffer)
        buffer.clear()

if buffer:
    insert_with_retries(buffer)
    count += len(buffer)

print(f"Inserted {count} docs into CS6220Poker.poker_bench")
