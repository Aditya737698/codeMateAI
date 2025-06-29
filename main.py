from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class Query(BaseModel):
    messages: list[Message]

@app.post("/api/bug-assistant")
async def bug_assistant(query: Query):
    system_message = {
        "role": "system",
        "content": """You are CodeMate AI, a helpful programming assistant.

**Instructions:**
- Always use markdown formatting
- Use headings, bullets, and code blocks appropriately
- Add spacing between sections
- Be concise and helpful
"""
    }

    messages = [system_message] + [
        {"role": msg.role, "content": msg.content} for msg in query.messages
    ]

    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=messages,
            max_tokens=2048,
            temperature=0.7,
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        return {
            "reply": f"## ❌ Error\n\nSomething went wrong.\n\n**Details:** {str(e)}"
        }

@app.get("/")
def root():
    return {"message": "CodeMate AI Server is live."}
