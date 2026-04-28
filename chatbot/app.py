from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from rag_engine import build_rag_chain

load_dotenv()
app = FastAPI(title="ROSY Chatbot API")

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    answer: str

rag_chain = None

@app.on_event("startup")
def startup_event():    
    global rag_chain
    rag_chain = build_rag_chain("./data")

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    answer = rag_chain.invoke(req.message)
    return ChatResponse(answer=answer)
