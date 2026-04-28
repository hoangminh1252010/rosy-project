## Rosy Chatbot API (MVP)

API chatbot tư vấn dữ liệu nội bộ + ghi nhận yêu cầu báo giá.

### 1) Cài đặt

```bash
cd chatbot
py -3.9 -m pip install -r requirements.txt
```

### 2) Cấu hình `.env`

```env
HF_API_TOKEN=your_huggingface_token
HF_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
```

### 3) Chạy API server

```bash
py -3.9 -m uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload
```

### 4) Kết nối frontend

Tạo `frontend/.env`:

```env
VITE_CHATBOT_API_URL=http://localhost:8000/api/chat
```

### 5) API chính

- `POST /api/chat`
  - Request:
    ```json
    {
      "session_id": "unique-id-per-user",
      "message": "Tôi muốn báo giá website"
    }
    ```
  - Response:
    ```json
    {
      "reply": "Tuyệt vời, mình sẽ ghi nhận thông tin...",
      "mode": "lead_capture",
      "lead_done": false
    }
    ```

- `GET /api/leads`
  - Trả về danh sách lead đã lưu trong `chatbot/leads.db`.
