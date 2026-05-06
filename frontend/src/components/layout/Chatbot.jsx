import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

/**
 * Dev: URL local → luôn dùng `/api/chat` (proxy Vite → 127.0.0.1:8000).
 * Tránh `http://localhost:8000` trực tiếp từ trình duyệt (Windows hay resolve localhost → IPv6 ::1
 * trong khi uvicorn chỉ nghe 127.0.0.1 → Failed to fetch).
 * Prod: `VITE_CHATBOT_API_URL` hoặc fallback 127.0.0.1.
 */
function getChatbotApiUrl() {
  const raw = import.meta.env.VITE_CHATBOT_API_URL?.trim();
  if (import.meta.env.DEV) {
    const isLocalChatbot =
      !raw ||
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/api\/chat\/?$/i.test(raw);
    if (isLocalChatbot) return '/api/chat';
    return raw.replace(/^http:\/\/localhost(?=:|\b)/i, 'http://127.0.0.1');
  }
  if (raw) {
    return raw.replace(/^http:\/\/localhost(?=:|\b)/i, 'http://127.0.0.1');
  }
  return 'http://127.0.0.1:8000/api/chat';
}

const CHATBOT_API_URL = getChatbotApiUrl();

const getSessionId = () => {
  const key = 'rosy_chatbot_session_id';
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const sessionId = crypto.randomUUID();
  localStorage.setItem(key, sessionId);
  return sessionId;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! Mình là trợ lý AI của Rosysoft. Bạn có thể hỏi thông tin dịch vụ hoặc nhắn "báo giá" để mình ghi nhận yêu cầu.',
      sender: 'bot'
    }
  ]);

  const scrollRef = useRef(null);
  const sessionIdRef = useRef(getSessionId());

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    const messageText = input.trim();
    if (!messageText || isLoading) return;

    // Thêm tin nhắn của User
    const userMsg = { id: Date.now(), text: messageText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          message: messageText
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const data = await response.json();
      const replyText =
        data.reply ?? data.answer ?? 'Xin lỗi, mình chưa phản hồi được lúc này.';
      const botResponse = {
        id: Date.now() + 1,
        text: replyText,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const msg = String(error?.message ?? error);
      const isUnreachable =
        msg.includes('Failed to fetch') ||
        msg.includes('NetworkError') ||
        msg.includes('Load failed');
      const text = isUnreachable
        ? 'Không kết nối được máy chủ chatbot. Hãy chạy API Python (thư mục chatbot): python -m uvicorn app:app --host 0.0.0.0 --port 8000'
        : msg.startsWith('HTTP_')
          ? `Máy chủ chatbot trả lỗi (${msg.replace('HTTP_', '')}). Kiểm tra log cổng 8000 và OPENAI_API_KEY.`
          : 'Hiện chatbot đang bận. Bạn thử lại sau hoặc để lại thông tin báo giá để đội ngũ hỗ trợ trực tiếp nhé.';
      if (import.meta.env.DEV) {
        console.error('[Chatbot]', error);
      }
      const errorMsg = {
        id: Date.now() + 1,
        text,
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Nút bấm mở Chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Cửa sổ Chat */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="rounded-t-2xl bg-blue-600 p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg text-blue-600">
                <Bot size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Rosysoft AI Assistant</h3>
                <p className="text-[10px] text-emerald-300 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0"></span>
                  Trực tuyến
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-500 p-1 rounded-md transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Nội dung tin nhắn */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`shrink-0 p-2 rounded-full ${msg.sender === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-gray-300 text-gray-600'}`}>
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 max-w-[80%]">
                  <div className="shrink-0 p-2 rounded-full bg-gray-300 text-gray-600">
                    <Bot size={14} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-white border border-gray-100 shadow-sm">
                    <span className="inline-flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ô nhập liệu */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                placeholder="Nhập câu hỏi..."
                className="bg-transparent border-none focus:outline-none flex-1 text-sm text-gray-700"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <button
                type="button"
                aria-label="Gửi tin nhắn"
                onClick={handleSend}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800 transition-colors disabled:text-gray-400 p-0.5"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Powered by Rosysoft AI
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;