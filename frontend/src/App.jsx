import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';


function App() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    requestContent: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/quotations', formData);
      alert('Gửi yêu cầu thành công! ID của bạn là: ' + response.data.id);
      setFormData({ customerName: '', email: '', phone: '', requestContent: '' });
    } catch (error) {
      console.error('Lỗi kết nối Backend:', error);
      alert('Không thể kết nối tới máy chủ Java!');
    }
  };

  return (
    <>
      <Navbar/>

      <main className="bg-slate-50 min-h-[calc(100vh-80px)] p-6">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-blue-700">
            Yêu cầu Báo giá RosySoft
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Họ và tên"
              required
              className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              value={formData.customerName}
            />
            <input
              type="email"
              placeholder="Email liên hệ"
              required
              className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              required
              className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              value={formData.phone}
            />
            <textarea
              placeholder="Nhu cầu của bạn (ví dụ: tư vấn phần mềm kế toán...)"
              className="h-32 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, requestContent: e.target.value })}
              value={formData.requestContent}
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white shadow-lg transition hover:bg-blue-700"
            >
              Gửi Yêu Cầu Ngay
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;