import os, openai
from dotenv import load_dotenv
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=OPENAI_API_KEY)
resp = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role":"user","content":"Summarize 'poker' in one sentence."}],
    max_tokens=50,
)
print(resp.choices[0].message.content.strip())