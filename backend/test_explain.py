# backend/test_explain.py
# Fill these three variables, then run:
# python backend/test_explain.py

import json
import urllib.request
import urllib.error

# get an instruction from llm/pokerbench_10000.json
with open("llm/pokerbench_10000.json", "r") as f:
    pokerbench_data = json.load(f)

instruction = pokerbench_data[7]["instruction"]  # put the instruction text here (can be multi-line)
selected_answer = "call"
correct_answer = pokerbench_data[7]["output"]    # e.g. "check"

URL = "http://localhost:5050/api/explain"

payload = {
    "instruction": instruction,
    "selectedAnswer": selected_answer,
    "correctAnswer": correct_answer,
    "summarize": False
}

print(instruction)
print("\n\n")

data = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(URL, data=data, headers={"Content-Type": "application/json"}, method="POST")

try:
    with urllib.request.urlopen(req, timeout=150) as resp:
        # print explanation
        resp_text = resp.read().decode("utf-8")
        
        resp_json = json.loads(resp_text)
        print("Explanation:\n", resp_json.get("explanation", "<no explanation>"))
except urllib.error.HTTPError as e:
    try:
        body = e.read().decode("utf-8")
    except Exception:
        body = "<no body>"
    print(f"HTTP Error {e.code}: {e.reason}\n{body}")
except Exception as e:
    print("Request failed:", e)