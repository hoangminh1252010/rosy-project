import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const contactCards = [
  {
    title: "Trụ sở",
    content: "Tòa nhà GIC 1B Điện Biên Phủ, P25, Phường 25, Quận Bình Thạnh, Tp. HCM",
  },
  {
    title: "Điện thoại",
    content: "028 - 3514 6734 - 35 - 36",
  },
  {
    title: "Fax",
    content: "028 - 3514 6383",
  },
  {
    title: "Email",
    content: "support@rosysoft.vn",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    requestContent: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/quotations", formData);

      toast.success("Gửi yêu cầu thành công!");

      setFormData({
        customerName: "",
        email: "",
        phone: "",
        requestContent: "",
      });
    } catch (error) {
      console.error("Lỗi kết nối Backend:", error);
      toast.error("❌Không thể kết nối tới máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <nav className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-cyan-700">
              Trang chủ
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li className="font-medium text-slate-700">Liên hệ</li>
        </ol>
      </nav>

      <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-linear-to-br from-sky-900 via-blue-800 to-cyan-700 px-6 py-10 text-white md:px-10">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-100">
              Liên hệ với ROSY
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Kết nối với đội ngũ triển khai ERP cho doanh nghiệp của bạn
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-sky-50/90">
              Trang liên hệ được xây dựng theo nội dung từ ROSY, giữ đúng thông tin trụ sở, điện thoại và email
              để khách hàng dễ dàng gửi yêu cầu tư vấn, báo giá hoặc đăng ký demo.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-cyan-100">
                    {item.title}
                  </p>
                  <p className="mt-2 leading-7 text-white">{item.content}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="px-6 py-10 md:px-10">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold text-slate-900">Gửi yêu cầu</h2>
              <p className="mt-3 text-slate-600">
                Để lại thông tin, đội ngũ ROSY sẽ liên hệ và tư vấn giải pháp phù hợp cho mô hình vận hành của bạn.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Họ và tên</span>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      value={formData.customerName}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Số điện thoại</span>
                    <input
                      type="text"
                      placeholder="0908 743 879"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      value={formData.phone}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email liên hệ</span>
                  <input
                    type="email"
                    placeholder="support@company.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    value={formData.email}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Nội dung yêu cầu</span>
                  <textarea
                    placeholder="Ví dụ: Tôi cần tư vấn ERP cho doanh nghiệp may mặc, khoảng 30 người dùng..."
                    className="h-36 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={(e) => setFormData({ ...formData, requestContent: e.target.value })}
                    value={formData.requestContent}
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {loading ? "Đang gửi..." : "Gửi yêu cầu ngay"}
                </button>
              </form>

              <div className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-cyan-900">Hỗ trợ nhanh</p>
                <p className="mt-2 leading-7 text-slate-700">
                  Bạn có thể gọi trực tiếp <strong>028 - 3514 6734 - 35 - 36</strong> hoặc email{" "}
                  <strong>support@rosysoft.vn</strong> để được tư vấn nhanh về giải pháp và lịch demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </section>
  );
}