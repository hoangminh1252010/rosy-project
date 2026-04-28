import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Không tìm thấy trang</h1>
      <p className="mt-3 text-slate-600">Đường dẫn bạn truy cập không tồn tại.</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">
        Quay về trang chủ
      </Link>
    </section>
  );
}
