import { Link } from "react-router-dom";

const overviewItems = [
  { label: "Tính năng nổi bật", to: "/san-pham/tinh-nang-noi-bat" },
  { label: "Tổng quan phần mềm", to: "/san-pham/tong-quan" },
];

const standardItems = [
  { label: "Quản lý chi phí - Giá thành", to: "/san-pham/quan-ly-chi-phi-gia-thanh" },
  { label: "Quản lý TSCĐ - CCDC", to: "/san-pham/quan-ly-tscd-ccdc" },
  { label: "Quản lý hàng tồn kho", to: "/san-pham/quan-ly-hang-ton-kho" },
  { label: "Quản lý bán hàng", to: "/san-pham/ban-hang" },
  { label: "Quản lý mua hàng", to: "/san-pham/mua-hang" },
  { label: "Kế toán tài chính", to: "/san-pham/ke-toan-tai-chinh" },
];

const advancedItems = [
  { label: "Nâng cấp Dashboard BI", to: "/san-pham/nang-cap-dashboard-bi" },
  { label: "Kết nối trạm cân", to: "/san-pham/ket-noi-tram-can" },
  { label: "Quản lý tồn kho bằng Barcode", to: "/san-pham/quan-ly-ton-kho-bang-barcode" },
  { label: "Quan hệ khách hàng - CRM", to: "/san-pham/quan-he-khach-hang-crm" },
  { label: "Quản lý nhân sự - Tính lương", to: "/san-pham/quan-ly-nhan-su-tinh-luong" },
  { label: "ROSY WEB", to: "/san-pham/rosy-web" },
  { label: "Quản trị sản xuất", to: "/san-pham/quan-tri-san-xuat" },
];

function ProductGroup({ title, items }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 font-medium text-cyan-900 transition hover:bg-cyan-100"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Sản phẩm ERP ROSY</h1>
      <p className="mt-3 max-w-4xl text-slate-600">
        Phần mềm ROSY là giải pháp ERP tổng thể đáp ứng nhu cầu Quản trị Tài chính - Quản trị Sản xuất - Quản trị
        Nội bộ cho doanh nghiệp.
      </p>
      <div className="mt-8 space-y-6">
        <ProductGroup title="Tổng quan phần mềm ERP ROSY" items={overviewItems} />
        <ProductGroup title="Sản phẩm chuẩn" items={standardItems} />
        <ProductGroup title="Sản phẩm chuyên sâu" items={advancedItems} />
      </div>
    </section>
  );
}
