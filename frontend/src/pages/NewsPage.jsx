import { Link } from "react-router-dom";

const newsCategories = [
  { label: "Tin dự án", to: "/tin-tuc/tin-du-an" },
  { label: "Tin công nghệ", to: "/tin-tuc/tin-cong-nghe" },
  { label: "Tin tài chính", to: "/tin-tuc/tin-tai-chinh" },
  { label: "Tin nội bộ", to: "/tin-tuc/tin-noi-bo" },
];

const featuredPosts = [
  {
    title: "ROSY sẵn sàng đáp ứng các thay đổi theo Thông tư 99/2025/TT-BTC",
    excerpt: "Giải pháp chuyển đổi kế toán toàn diện cho doanh nghiệp từ ngày 01/01/2026.",
    to: "/tin-tuc/tin-tai-chinh",
  },
  {
    title: "Top 5 ứng dụng AI phổ biến nhất hiện nay",
    excerpt: "Tổng quan các ứng dụng AI hỗ trợ phân tích dữ liệu và tự động hóa tác vụ.",
    to: "/tin-tuc/tin-cong-nghe",
  },
  {
    title: "Xu hướng ERP 2026: Chuyển đổi số đúng trọng tâm",
    excerpt: "Phân tích xu hướng ERP theo dữ liệu vận hành, AI và triển khai theo ngành.",
    to: "/tin-tuc/tin-cong-nghe",
  },
];

export default function NewsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Tin tức</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {newsCategories.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-xl border border-slate-200 bg-white p-5 text-center font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-800"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {featuredPosts.map((post) => (
          <article key={post.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-44 rounded-xl bg-slate-200" />
            <h2 className="mt-5 text-xl font-bold leading-tight text-slate-800">{post.title}</h2>
            <p className="mt-3 text-slate-600">{post.excerpt}</p>
            <Link to={post.to} className="mt-4 inline-block font-semibold text-cyan-700 hover:text-cyan-800">
              Xem thêm
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
