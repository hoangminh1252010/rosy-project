import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000/api/chat';

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
        throw new Error('Chatbot service unavailable');
      }

      const data = await response.json();
      const botResponse = {
        id: Date.now() + 1,
        text: data.reply || 'Xin lỗi, mình chưa phản hồi được lúc này.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMsg = {
        id: Date.now() + 1,
        text: 'Hiện chatbot đang bận. Bạn thử lại sau hoặc để lại thông tin báo giá để đội ngũ hỗ trợ trực tiếp nhé.',
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
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Rosysoft AI Assistant</h3>
                <p className="text-[10px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Trực tuyến
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
                  <div className={`p-2 rounded-full ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
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
                onClick={handleSend}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800 transition-colors disabled:text-gray-400"
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