import { Link } from "react-router-dom";

const serviceItems = [
  { label: "Giới thiệu chung", to: "/dich-vu/gioi-thieu" },
  { label: "Chăm sóc khách hàng", to: "/dich-vu/cham-soc-khach-hang" },
  { label: "Tùy chỉnh, cài đặt phần mềm", to: "/dich-vu/tuy-chinh-cai-dat-phan-mem" },
  { label: "Đào tạo, hỗ trợ sử dụng", to: "/dich-vu/dao-tao-ho-tro-su-dung" },
  { label: "Bảo hành, bảo trì phần mềm", to: "/dich-vu/bao-hanh-bao-tri-phan-mem" },
  { label: "Tư vấn giải pháp", to: "/dich-vu/tu-van-giai-phap" },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Dịch vụ</h1>
      <p className="mt-3 max-w-4xl text-slate-600">
        ROSY cung cấp đầy đủ dịch vụ triển khai và vận hành nhằm đảm bảo phần mềm ứng dụng hiệu quả trong doanh nghiệp.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-800"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
