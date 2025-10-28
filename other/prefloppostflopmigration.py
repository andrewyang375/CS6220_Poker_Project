import re
from typing import Optional, Literal
from pymongo import MongoClient, UpdateOne
uri = "mongodb+srv://davidpeeler9_db_user:CS6220_poker@cs6220poker.qvj1rfd.mongodb.net/CS6220Poker?retryWrites=true&w=majority&appName=CS6220Poker"

client = MongoClient(
    uri,
    serverSelectionTimeoutMS=30000,
    connectTimeoutMS=30000,
    socketTimeoutMS=120000,
    maxPoolSize=10,
)

db = client["CS6220Poker"]
coll = db["poker_bench"]

Street = Literal["preflop", "flop", "turn", "river"]

FLOP_PATTERNS = [
    r"\bthe\s+flop\s+comes\b",
    r"\bon\s+the\s+flop\b",
    r"\bflop\s*:",
]
TURN_PATTERNS = [
    r"\bthe\s+turn\s+comes\b",
    r"\bon\s+the\s+turn\b",
    r"\bturn\s*:",
]
RIVER_PATTERNS = [
    r"\bthe\s+river\s+comes\b",
    r"\bon\s+the\s+river\b",
    r"\briver\s*:",
]

def _compile(ps):
    return [re.compile(p, re.IGNORECASE) for p in ps]

RE_FLOP  = _compile(FLOP_PATTERNS)
RE_TURN  = _compile(TURN_PATTERNS)
RE_RIVER = _compile(RIVER_PATTERNS)

def _last_index(text: str, regs) -> Optional[int]:
    last = None
    for rx in regs:
        for m in rx.finditer(text):
            pre = text[max(0, m.start()-24):m.start()].lower()
            if "before the " in pre:
                continue
            if last is None or m.start() > last:
                last = m.start()
    return last

def detect_street(text: str) -> Street:
    if not text:
        return "preflop"
    i_flop  = _last_index(text, RE_FLOP)
    i_turn  = _last_index(text, RE_TURN)
    i_river = _last_index(text, RE_RIVER)

    best = max([i for i in (i_flop, i_turn, i_river) if i is not None], default=None)
    if best is None:
        return "preflop"
    if best == i_river:
        return "river"
    if best == i_turn:
        return "turn"
    return "flop"

def street_to_stage(street: Street) -> Literal["preflop", "postflop"]:
    return "preflop" if street == "preflop" else "postflop"

BATCH_READ  = 4000
BATCH_WRITE = 800
DRY_RUN     = False 

def main():
    total = coll.estimated_document_count()
    print(f" total documents: {total:,}")

    processed = 0
    updated = 0
    changed_street = 0
    changed_stage = 0

    ops = []

    # Only fetch fields we need to compute + existing fields for diff
    cursor = coll.find({}, {"_id": 1, "instruction": 1, "street": 1, "stage": 1}).batch_size(BATCH_READ)

    for doc in cursor:
        processed += 1
        instr = (doc.get("instruction") or "")
        new_street = detect_street(instr)
        new_stage  = street_to_stage(new_street)

        old_street = doc.get("street")
        old_stage  = doc.get("stage")

        set_map = {}
        if old_street != new_street:
            set_map["street"] = new_street
            changed_street += 1
        if old_stage != new_stage:
            set_map["stage"] = new_stage
            changed_stage += 1

        if set_map:
            ops.append(UpdateOne({"_id": doc["_id"]}, {"$set": set_map}))
            if len(ops) >= BATCH_WRITE:
                if not DRY_RUN:
                    res = coll.bulk_write(ops, ordered=False)
                    updated += res.modified_count
                ops.clear()

        if processed % 20000 == 0:
            print(f"… processed {processed:,} | staged changes: street={changed_street:,}, stage={changed_stage:,} | written={updated:,}")

    # flush remaining
    if ops and not DRY_RUN:
        res = coll.bulk_write(ops, ordered=False)
        updated += res.modified_count

if __name__ == "__main__":
    main()
