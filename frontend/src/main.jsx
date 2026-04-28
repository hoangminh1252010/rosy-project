import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import SolutionsPage from "./pages/SolutionsPage";
import NewsPage from "./pages/NewsPage";
import PartnersPage from "./pages/PartnersPage";
import CareersPage from "./pages/CareersPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import SimplePage from "./pages/SimplePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "san-pham", element: <ProductsPage /> },
      { path: "san-pham/tinh-nang-noi-bat", element: <SimplePage title="Tính năng nổi bật" /> },
      { path: "san-pham/tong-quan", element: <SimplePage title="Tổng quan ERP ROSY" /> },
      { path: "san-pham/nang-cap-dashboard-bi", element: <SimplePage title="Nâng cấp Dashboard BI" /> },
      { path: "san-pham/ke-toan-tai-chinh", element: <SimplePage title="Kế toán tài chính" /> },
      { path: "san-pham/mua-hang", element: <SimplePage title="Quản lý mua hàng" /> },
      { path: "san-pham/quan-tri-san-xuat", element: <SimplePage title="Quản trị sản xuất" /> },
      { path: "san-pham/ban-hang", element: <SimplePage title="Quản lý bán hàng" /> },
      { path: "san-pham/quan-ly-hang-ton-kho", element: <SimplePage title="Quản lý hàng tồn kho" /> },
      { path: "san-pham/quan-ly-chi-phi-gia-thanh", element: <SimplePage title="Quản lý chi phí - Giá thành" /> },
      { path: "san-pham/quan-ly-tscd-ccdc", element: <SimplePage title="Quản lý TSCĐ - CCDC" /> },
      {
        path: "san-pham/quan-ly-ton-kho-bang-barcode",
        element: <SimplePage title="Quản lý tồn kho bằng Barcode" />,
      },
      { path: "san-pham/ket-noi-tram-can", element: <SimplePage title="Kết nối trạm cân" /> },
      { path: "san-pham/rosy-web", element: <SimplePage title="ROSY WEB" /> },
      {
        path: "san-pham/quan-ly-nhan-su-tinh-luong",
        element: <SimplePage title="Quản lý nhân sự - Tính lương" />,
      },
      { path: "san-pham/quan-he-khach-hang-crm", element: <SimplePage title="Quan hệ khách hàng - CRM" /> },
      { path: "dich-vu", element: <ServicesPage /> },
      { path: "dich-vu/gioi-thieu", element: <SimplePage title="Giới thiệu chung" /> },
      { path: "dich-vu/cham-soc-khach-hang", element: <SimplePage title="Chăm sóc khách hàng" /> },
      { path: "dich-vu/tuy-chinh-cai-dat-phan-mem", element: <SimplePage title="Tùy chỉnh, cài đặt phần mềm" /> },
      { path: "dich-vu/dao-tao-ho-tro-su-dung", element: <SimplePage title="Đào tạo, Hỗ trợ sử dụng" /> },
      { path: "dich-vu/bao-hanh-bao-tri-phan-mem", element: <SimplePage title="Bảo hành, Bảo trì phần mềm" /> },
      { path: "dich-vu/tu-van-giai-phap", element: <SimplePage title="Tư vấn giải pháp" /> },
      { path: "giai-phap", element: <SolutionsPage /> },
      { path: "giai-phap/hoa-don-dien-tu-dau-vao", element: <SimplePage title="Giải pháp hóa đơn điện tử đầu vào" /> },
      {
        path: "giai-phap/ung-dung-di-dong-trong-san-xuat",
        element: <SimplePage title="Rosy ứng dụng di động trong sản xuất" />,
      },
      { path: "giai-phap/hoa-don-dien-tu-rs-invoice", element: <SimplePage title="Giải pháp hóa đơn điện tử Rs-Invoice" /> },
      { path: "giai-phap/nganh-bao-bi-in-an", element: <SimplePage title="Giải pháp ngành Bao Bì - In Ấn" /> },
      { path: "giai-phap/hoa-don-dien-tu", element: <SimplePage title="Hóa đơn điện tử" /> },
      { path: "giai-phap/soi-det-nhuom-may", element: <SimplePage title="Giải pháp sợi - dệt - nhuộm - may" /> },
      { path: "giai-phap/barcode", element: <SimplePage title="Giải pháp Barcode" /> },
      { path: "giai-phap/ket-noi-tram-can", element: <SimplePage title="Giải pháp Kết Nối Trạm Cân" /> },
      { path: "giai-phap/chuyen-nganh-noi-that", element: <SimplePage title="Giải pháp Chuyên Ngành Nội Thất" /> },
      { path: "giai-phap/ton-kho-barcode", element: <SimplePage title="Giải pháp Tồn Kho Barcode" /> },
      { path: "giai-phap/giao-nhan-van-chuyen", element: <SimplePage title="Giải pháp Giao Nhận, Vận Chuyển" /> },
      { path: "giai-phap/bao-tri-may-moc-thiet-bi", element: <SimplePage title="Giải pháp Bảo Trì Máy Móc Thiết Bị" /> },
      { path: "tich-hop/barcode-tram-can", element: <SimplePage title="Tích hợp Barcode - Trạm cân" /> },
      { path: "tich-hop/rosy-gp-monitor-san-xuat", element: <SimplePage title="Tích hợp Rosy_GP Monitor sản xuất" /> },
      { path: "tich-hop/rosy-web", element: <SimplePage title="Tích hợp Rosy Web" /> },
      { path: "tin-tuc", element: <NewsPage /> },
      { path: "tin-tuc/tin-du-an", element: <SimplePage title="Tin Dự Án" /> },
      { path: "tin-tuc/tin-cong-nghe", element: <SimplePage title="Tin Công nghệ" /> },
      { path: "tin-tuc/tin-tai-chinh", element: <SimplePage title="Tin Tài chính" /> },
      { path: "tin-tuc/tin-noi-bo", element: <SimplePage title="Tin Nội bộ" /> },
      { path: "doi-tac", element: <PartnersPage /> },
      { path: "tuyen-dung", element: <CareersPage /> },
      { path: "ve-chung-toi", element: <AboutPage /> },
      { path: "lien-he", element: <ContactPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);