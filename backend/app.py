import os
import re
import json
import random
from typing import List, Dict, Any, Optional
from bson import ObjectId, errors as bson_errors
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING, DESCENDING
from dotenv import load_dotenv
from werkzeug.routing import BaseConverter

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": os.getenv("ALLOWED_ORIGINS", "*")}})

# ── Mongo ──────────────────────────────────────────────────────────────────
client = MongoClient(
    os.getenv("MONGODB_URI"),
    serverSelectionTimeoutMS=30000,
    connectTimeoutMS=30000,
    socketTimeoutMS=120000,
    maxPoolSize=10,
)
db = client[os.getenv("MONGODB_DB", "CS6220Poker")]
coll = db[os.getenv("MONGODB_COLLECTION", "poker_bench")]

# ── Route converters ───────────────────────────────────────────────────────
class ObjectIdConverter(BaseConverter):
    regex = r"[0-9a-fA-F]{24}"

class StageConverter(BaseConverter):
    regex = r"(?:preflop|postflop)"

app.url_map.converters["objectid"] = ObjectIdConverter
app.url_map.converters["stage"] = StageConverter

# ── Helpers ────────────────────────────────────────────────────────────────
def oid(s: str) -> Optional[ObjectId]:
    try:
        return ObjectId(s)
    except bson_errors.InvalidId:
        return None

def doc_to_json(d: Dict[str, Any]) -> Dict[str, Any]:
    if not d:
        return d
    d["_id"] = str(d["_id"])
    return d

# Normalize actions like "fold", "call", "raise 13", "bet 4", "all in"
RAISE_RX = re.compile(r"\braise\s+(\d+(?:\.\d+)?)", re.IGNORECASE)
BET_RX   = re.compile(r"\bbet\s+(\d+(?:\.\d+)?)", re.IGNORECASE)

def normalize_action(s: str) -> str:
    if not s:
        return "fold"
    t = s.strip().lower()
    if "all in" in t or "all-in" in t or "allin" in t:
        return "all in"
    if "fold" in t:
        return "fold"
    if "check" in t:
        return "check"
    if "call" in t:
        return "call"
    m = RAISE_RX.search(t)
    if m:
        return f"raise {m.group(1)}"
    m = BET_RX.search(t)
    if m:
        return f"bet {m.group(1)}"
    return t

def _looks_like_bet_phrase(txt: str) -> bool:
    # Covers “X bet 11 chips”, “bet 11”, “raises 10”, “raise 10”, etc.
    return bool(re.search(r"\bbet\b|\braise\b", txt))

def generate_distractors(correct: str, instruction: str = "") -> List[str]:
    """
    Generate 3 plausible, context-aware distractors given the correct action.
    Remove illegal actions like 'check' if facing a bet, or 'call' if no bet to call.
    Prefer sizing variants near the correct size when applicable.
    """
    base_pool = [
        "fold", "check", "call", "all in",
        "bet 2", "bet 4", "bet 6", "bet 8", "bet 12",
        "raise 3", "raise 5", "raise 8", "raise 10", "raise 15", "raise 20"
    ]

    correct_norm = normalize_action(correct)
    text = instruction.lower()

    # 1) Context detection (very lightweight)
    # If any bet/raise occurred last action by villain (simple heuristic: presence in instruction text)
    facing_bet = _looks_like_bet_phrase(text)
    # Very rough: if we detect "raise", we assume a bet/raise exists
    facing_raise = " raise " in text

    # 2) Remove contextually impossible options
    illegal_tokens = set()
    if facing_bet or facing_raise:
        # When facing a bet/raise, you cannot check/bet
        illegal_tokens.update(["check", "bet"])
    else:
        # When not facing a bet, you cannot call
        illegal_tokens.update(["call"])

    # Preflop: if everyone folded to you (no call/raise mentioned), checking is illegal
    if "before the flop" in text and not _looks_like_bet_phrase(text):
        illegal_tokens.add("check")

    # 3) numeric variants near the correct sizing
    options = set()
    size_val = None
    if correct_norm.startswith(("raise ", "bet ")):
        try:
            size_val = float(correct_norm.split()[1])
        except Exception:
            size_val = None

    if size_val:
        deltas = [-2, -1, -0.5, 0.5, 1, 2, 3]
        for d in deltas:
            v = size_val + d
            if v > 0:
                kind = "raise" if correct_norm.startswith("raise") else "bet"
                candidate = f"{kind} {round(v, 1)}"
                if candidate != correct_norm:
                    options.add(candidate)

    # 4) Add baseline actions (minus illegal + correct)
    for act in base_pool:
        a_norm = normalize_action(act)
        if a_norm == correct_norm:
            continue
        # Filter out illegal tokens
        token = a_norm.split()[0]  # 'fold', 'check', 'call', 'bet', 'raise', 'all'
        if token in illegal_tokens:
            continue
        options.add(a_norm)

    uniq = list(options)
    random.shuffle(uniq)
    return uniq[:3]

def build_choices(correct_output: str, instruction: str = "") -> List[str]:
    correct = normalize_action(correct_output or "")
    distractors = generate_distractors(correct, instruction)
    choices = distractors + [correct]
    random.shuffle(choices)
    return choices

with app.app_context():
    try:
        coll.create_index([("timestamp", DESCENDING)], background=True)
    except Exception as e:
        print(f"⚠️ Index creation failed: {e}")

@app.after_request
def add_cors_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = os.getenv("ALLOWED_ORIGINS", "*")
    resp.headers["Access-Control-Allow-Methods"] = "GET,POST,PATCH,DELETE,OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return resp

# ── Health ─────────────────────────────────────────────────────────────────
@app.get("/api/health")
def health():
    try:
        client.admin.command("ping")
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

# ── Questions: random (optionally by stage) ────────────────────────────────
@app.get("/api/questions/random")
def get_random_question():
    """
    Returns a question payload ready for the UI:
    { id, instruction, stage, street?, choices[4], correctAnswer }
    Optional query: ?stage=preflop|postflop
    """
    try:
        stage = request.args.get("stage")
        pipeline = []
        if stage in ("preflop", "postflop"):
            pipeline.append({"$match": {"stage": stage}})
        pipeline.append({"$sample": {"size": 1}})

        sample = list(coll.aggregate(pipeline))
        if not sample:
            return jsonify({"error": "no documents found"}), 404

        d = sample[0]
        instruction = d.get("instruction", "").strip()
        correct = d.get("output", "").strip() or d.get("answer", "").strip()

        choices = build_choices(correct, instruction)

        payload = {
            "id": str(d["_id"]),
            "instruction": instruction,
            "stage": d.get("stage"),
            "street": d.get("street"),
            "choices": choices,
            "correctAnswer": normalize_action(correct),
        }
        return jsonify(payload)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/api/questions/<objectid:id>")
def get_question_by_id(id):
    try:
        d = coll.find_one({"_id": ObjectId(id)})
        if not d:
            return jsonify({"error": "not found"}), 404
        instruction = d.get("instruction", "").strip()
        correct = normalize_action((d.get("output", "").strip() or d.get("answer", "").strip()))
        choices = build_choices(correct, instruction)
        payload = {
            "id": str(d["_id"]),
            "instruction": instruction,
            "stage": d.get("stage"),
            "street": d.get("street"),
            "choices": choices,
            "correctAnswer": correct,
        }
        return jsonify(payload)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def build_llm_prompt(instruction: str, selected: str, correct: str) -> str:
    return f"""
You are a professional poker coach.
The following is a 6-max No Limit Hold'em hand. Analyze the spot succinctly.

SCENARIO
---
{instruction}
---

The student chose: "{selected}"
The correct move is: "{correct}"

Explain in 2–4 concise sentences why the correct answer is better.
Focus on ranges, position, pot dynamics, board texture, and EV. Avoid fluff.
"""

@app.post("/api/explain")
def explain():
    """
    Body: { instruction: str, selectedAnswer: str, correctAnswer: str }
    Returns: { explanation: str }
    """
    payload = request.get_json(silent=True) or {}
    instruction = (payload.get("instruction") or "").strip()
    selected = (payload.get("selectedAnswer") or "").strip()
    correct = (payload.get("correctAnswer") or "").strip()

    if not instruction or not selected or not correct:
        return jsonify({"error": "instruction, selectedAnswer, and correctAnswer are required"}), 400

    prompt = build_llm_prompt(instruction, selected, correct)

    try:
        # ── PLACEHOLDER BEHAVIOR (no external call) ─────────────────────────
        if LLM_PROVIDER == "placeholder":
            explanation = f"[PLACEHOLDER] Why '{correct}' is preferred over '{selected}' for this spot."
            return jsonify({"explanation": explanation})
        # ── PLACEHOLDER BEHAVIOR (no external call) ─────────────────────────

        return jsonify({"explanation": "[UNCONFIGURED LLM] Set LLM_PROVIDER/LLM_API_* envs to enable real explanations."})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ── List & aggregate ───────────────────────────────────────────────────────
@app.get("/api/hands")
def list_hands():
    page = max(int(request.args.get("page", 1)), 1)
    limit = min(max(int(request.args.get("limit", 50)), 1), 500)
    skip = (page - 1) * limit

    filter_arg = request.args.get("filter")
    project_arg = request.args.get("project")
    sort_arg = request.args.get("sort")

    q = {}
    if filter_arg:
        try:
            q = json.loads(filter_arg)
        except json.JSONDecodeError:
            return jsonify({"error": "invalid filter json"}), 400

    proj = None
    if project_arg:
        try:
            proj = json.loads(project_arg)
        except json.JSONDecodeError:
            return jsonify({"error": "invalid project json"}), 400

    sort = None
    if sort_arg:
        try:
            raw = json.loads(sort_arg)
            if isinstance(raw, dict):
                sort = [
                    (k, DESCENDING if str(v).startswith("-") or v in (-1, "desc") else ASCENDING)
                    for k, v in raw.items()
                ]
            elif isinstance(raw, list):
                sort = []
                for item in raw:
                    if isinstance(item, list) and len(item) == 2:
                        sort.append(
                            (item[0], DESCENDING if str(item[1]).startswith("-") or item[1] in (-1, "desc") else ASCENDING)
                        )
            if not sort:
                sort = None
        except json.JSONDecodeError:
            return jsonify({"error": "invalid sort json"}), 400

    cursor = coll.find(q, proj)
    if sort:
        cursor = cursor.sort(sort)
    total = coll.count_documents(q)
    data = [doc_to_json(d) for d in cursor.skip(skip).limit(limit)]

    return jsonify({
        "data": data,
        "page": page,
        "limit": limit,
        "total": total,
        "hasMore": skip + limit < total
    })

@app.post("/api/aggregate")
def aggregate():
    payload = request.get_json(silent=True)
    pipeline = payload.get("pipeline") if isinstance(payload, dict) else None
    if not isinstance(pipeline, list):
        return jsonify({"error": "pipeline must be an array"}), 400
    try:
        data = list(coll.aggregate(pipeline, allowDiskUse=True))
        data = [doc_to_json(d) for d in data]
        return jsonify({"data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5050"))
    print(f"🚀 Flask server running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port)
