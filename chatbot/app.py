import logging
import os
from pathlib import Path
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag_engine import build_general_chain, build_rag_chain

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"

SPRING_QUOTATION_API_URL = os.getenv(
    "SPRING_QUOTATION_API_URL",
    "http://localhost:8080/api/quotations",
)


def _parse_cors_origins() -> list[str]:
    raw = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    )
    return [o.strip() for o in raw.split(",") if o.strip()]


app = FastAPI(title="ROSY Chatbot API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=_parse_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str
    mode: str = "chat"
    lead_saved: bool = False

rag_chain = None
general_chain = None

logger = logging.getLogger(__name__)


def save_lead_to_mongodb(session_id: str, message: str) -> bool:
    """
    Ghi yêu cầu báo giá vào MongoDB qua REST Spring Boot (QuotationController).
    Payload khớp backend.model.Quotation (camelCase do Jackson).
    """
    payload = {
        "sessionId": session_id,
        "requestContent": message,
        "source": "chatbot",
    }
    try:
        with httpx.Client(timeout=15.0) as client:
            r = client.post(SPRING_QUOTATION_API_URL, json=payload)
            r.raise_for_status()
        return True
    except Exception:
        return False

def wants_quote(text: str) -> bool:
    low = text.lower()
    keys = ("báo giá", "bao gia", "báo gía", "bao giá", "quote", "pricing", "estimate")
    return any(k in low for k in keys)


# Tin nhắn chủ yếu là gọi báo giá (ngắn) → không gọi RAG, tránh ghép "không biết" + xác nhận báo giá
_QUOTE_MSG_MAX_CHARS = 72
_QUOTE_MSG_MAX_WORDS = 14

_CANNED_QUOTE_OK = (
    "Cảm ơn bạn đã quan tâm đến Rosysoft! "
    "Mình đã ghi nhận yêu cầu báo giá của bạn. "
    "Đội ngũ sẽ liên hệ sớm nhất có thể."
)
_CANNED_QUOTE_SAVE_FAILED = (
    "Cảm ơn bạn! Hiện chưa lưu được yêu cầu vào hệ thống. "
    "Bạn vui lòng thử lại sau hoặc liên hệ Rosysoft trực tiếp nhé."
)

def is_quote_focused_message(text: str) -> bool:
    """True nếu khách chỉ/chủ yếu nhắc báo giá (không phải đoạn dài hỏi kỹ thuật kèm báo giá)."""
    if not wants_quote(text):
        return False
    s = text.strip()
    if len(s) > _QUOTE_MSG_MAX_CHARS:
        return False
    return len(s.split()) <= _QUOTE_MSG_MAX_WORDS


def rag_sounds_like_no_answer(text: str) -> bool:
    """Heuristic: RAG trả lời kiểu không có trong tài liệu."""
    low = text.lower()
    needles = (
        "không biết",
        "không có thông tin",
        "chưa có thông tin",
        "theo tài liệu hiện có",
        "don't know",
        "do not know",
        "i don't know",
        "no information",
        "không đủ",
        "insufficient context",
        "cannot answer",
        "unable to answer",
    )
    return any(n in low for n in needles)


def invoke_general_chain(message: str) -> Optional[str]:
    """Fallback gọi model general nếu RAG thiếu context."""
    if general_chain is None:
        return None
    try:
        answer = general_chain.invoke(message)
        reply = answer.strip() if isinstance(answer, str) else str(answer)
        return reply or None
    except Exception:
        logger.exception("General chain failed.")
        return None


@app.on_event("startup")
def startup_event() -> None:
    global rag_chain, general_chain
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    try:
        general_chain = build_general_chain()
    except Exception:
        logger.exception("Không khởi tạo được general chain.")
        general_chain = None
    try:
        rag_chain = build_rag_chain(str(DATA_DIR))
    except Exception:
        logger.exception(
            "Không khởi tạo được RAG/Fallback (kiểm tra OPENAI_API_KEY, mạng, file PDF). "
            "API vẫn chạy nhưng /api/chat sẽ báo chưa sẵn sàng."
        )
        rag_chain = None


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    if rag_chain is None and general_chain is None:
        return ChatResponse(
            reply="Dịch vụ chat đang khởi động lại. Bạn thử lại sau ít phút nhé.",
            mode="error",
        )

    lead_saved = False
    mode = "chat"

    # Chỉ báo giá / câu ngắn → không RAG (PDF không mô tả "báo giá" như câu hỏi kiến thức)
    if is_quote_focused_message(req.message):
        lead_saved = save_lead_to_mongodb(req.session_id, req.message)
        mode = "lead_capture"
        reply = _CANNED_QUOTE_OK if lead_saved else _CANNED_QUOTE_SAVE_FAILED
        return ChatResponse(reply=reply, mode=mode, lead_saved=lead_saved)

    if rag_chain is None:
        general_reply = invoke_general_chain(req.message)
        if general_reply:
            return ChatResponse(reply=general_reply, mode=mode, lead_saved=lead_saved)
        return ChatResponse(
            reply="Hiện hệ thống chưa xử lý được câu hỏi. Bạn thử lại sau hoặc để lại yêu cầu báo giá nhé.",
            mode="error",
        )
    try:
        answer = rag_chain.invoke(req.message)
    except Exception:
        general_reply = invoke_general_chain(req.message)
        if general_reply:
            return ChatResponse(reply=general_reply, mode=mode, lead_saved=lead_saved)
        return ChatResponse(
            reply="Hiện hệ thống chưa xử lý được câu hỏi. Bạn thử lại sau hoặc để lại yêu cầu báo giá nhé.",
            mode="error",
        )

    reply = answer.strip() if isinstance(answer, str) else str(answer)

    # Hybrid mode: khi RAG thiếu thông tin trong tài liệu, dùng general AI để trả lời.
    if rag_sounds_like_no_answer(reply):
        general_reply = invoke_general_chain(req.message)
        if general_reply:
            reply = general_reply

    if wants_quote(req.message):
        lead_saved = save_lead_to_mongodb(req.session_id, req.message)
        mode = "lead_capture"
        if lead_saved:
            if rag_sounds_like_no_answer(reply):
                reply = _CANNED_QUOTE_OK
            else:
                suffix = (
                    "\n\nMình đã ghi nhận yêu cầu báo giá của bạn. "
                    "Đội ngũ Rosysoft sẽ liên hệ sớm nhất có thể."
                )
                if suffix.strip() not in reply:
                    reply = reply + suffix
        else:
            if rag_sounds_like_no_answer(reply):
                reply = _CANNED_QUOTE_SAVE_FAILED
            else:
                fail_note = (
                    "\n\nHiện chưa lưu được yêu cầu vào hệ thống. "
                    "Bạn vui lòng thử lại sau hoặc liên hệ Rosysoft trực tiếp nhé."
                )
                if fail_note.strip() not in reply:
                    reply = reply + fail_note

    return ChatResponse(reply=reply, mode=mode, lead_saved=lead_saved)


@app.get("/api/leads")
def list_leads(limit: int = 50) -> dict:
    """
    Proxy danh sách báo giá từ Spring (MongoDB collection quotations).
    Giữ key `leads` để tương thích; mỗi phần tử là document quotation gốc.
    """
    limit = max(1, min(limit, 200))
    try:
        with httpx.Client(timeout=15.0) as client:
            r = client.get(SPRING_QUOTATION_API_URL)
            r.raise_for_status()
            rows = r.json()
    except Exception:
        return {"leads": [], "error": "Không đọc được từ backend Spring."}

    if not isinstance(rows, list):
        return {"leads": [], "error": "Định dạng phản hồi không hợp lệ."}

    rows = rows[:limit]
    return {"leads": rows}


@app.get("/api/health")
def health() -> dict:
    return {"ok": True, "rag_ready": rag_chain is not None}
