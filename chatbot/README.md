## Rosy Chatbot API

API chatbot: RAG trên PDF trong `chatbot/data/` + ghi nhận **báo giá** vào **MongoDB** thông qua backend **Spring Boot** (`POST /api/quotations`).

### 0) Chuỗi dịch vụ

1. **MongoDB** (ví dụ Docker trong `docker-compose.yml`).
2. **Spring Boot** (`backend/`) chạy cổng **8080**, kết nối MongoDB và expose `QuotationController`.
3. **FastAPI chatbot** (`chatbot/app.py`) cổng **8000**: khi phát hiện tin nhắn báo giá → gọi Spring để lưu document vào collection **`quotations`**.

### 1) Cài đặt chatbot

```bash
cd chatbot
python -m pip install -r requirements.txt
```

### 2) Cấu hình `.env`

Copy `.env.example` → `.env`: `OPENAI_API_KEY`, và **`SPRING_QUOTATION_API_URL`** (mặc định `http://localhost:8080/api/quotations` nếu Spring chạy local).

### 3) Dữ liệu RAG

Đặt file PDF vào `chatbot/data/`. Nếu **chưa có PDF**, API vẫn chạy **chat fallback**.

### 4) Chạy server chatbot

```bash
cd chatbot
python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

(Lúc test báo giá cần **Spring Boot đã chạy** và MongoDB đã lên.)

### 5) Frontend

**Dev (khuyến nghị):** không cần `.env` — Vite proxy `POST /api/chat` → `http://127.0.0.1:8000`. Chỉ cần **chạy đồng thời** `npm run dev` và uvicorn port 8000.

**Build production:** set `VITE_CHATBOT_API_URL` trỏ tới URL chatbot thật.

```env
VITE_CHATBOT_API_URL=https://your-api.example.com/api/chat
```

### Gỡ lỗi “không kết nối được máy chủ chatbot”

- Chạy FastAPI: `cd chatbot && python -m uvicorn app:app --host 0.0.0.0 --port 8000`
- Có PDF trong `data/`: cần **`OPENAI_API_KEY`** hợp lệ; nếu lỗi khi embed, log sẽ ghi lỗi nhưng server vẫn lên — khi đó gọi `/api/health`: `rag_ready` có thể là `false`.

### 6) API

**POST `/api/chat`** — request `session_id`, `message`. Khi có từ khoá báo giá → FastAPI gọi Spring → MongoDB; `lead_saved: true` nếu lưu thành công.

**GET `/api/leads`** — đọc proxy từ Spring `GET /api/quotations` (cùng dữ liệu MongoDB).

**GET `/api/health`** — kiểm tra service.

### Model MongoDB

Document `Quotation` có thêm `sessionId`, `source` (`chatbot`) và `requestContent` (nội dung tin nhắn). Chi tiết: `backend/src/main/java/backend/model/Quotation.java`.
