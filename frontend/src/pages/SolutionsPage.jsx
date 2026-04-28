import { Link } from "react-router-dom";

const solutionItems = [
  { label: "Giải pháp hóa đơn điện tử đầu vào", to: "/giai-phap/hoa-don-dien-tu-dau-vao" },
  { label: "Rosy ứng dụng di động trong sản xuất", to: "/giai-phap/ung-dung-di-dong-trong-san-xuat" },
  { label: "Giải pháp hóa đơn điện tử Rs-Invoice", to: "/giai-phap/hoa-don-dien-tu-rs-invoice" },
  { label: "Giải pháp ngành bao bì - in ấn", to: "/giai-phap/nganh-bao-bi-in-an" },
  { label: "Giải pháp sợi - dệt - nhuộm - may", to: "/giai-phap/soi-det-nhuom-may" },
  { label: "Giải pháp kết nối trạm cân", to: "/giai-phap/ket-noi-tram-can" },
  { label: "Giải pháp chuyên ngành nội thất", to: "/giai-phap/chuyen-nganh-noi-that" },
  { label: "Giải pháp tồn kho barcode", to: "/giai-phap/ton-kho-barcode" },
  { label: "Giải pháp giao nhận, vận chuyển", to: "/giai-phap/giao-nhan-van-chuyen" },
  { label: "Giải pháp bảo trì máy móc thiết bị", to: "/giai-phap/bao-tri-may-moc-thiet-bi" },
];

export default function SolutionsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Giải pháp</h1>
      <p className="mt-3 max-w-4xl text-slate-600">
        Danh mục giải pháp chuyên ngành của ROSY được xây dựng theo nhu cầu vận hành thực tế của từng lĩnh vực.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {solutionItems.map((item) => (
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
