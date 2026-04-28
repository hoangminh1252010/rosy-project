import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import slide1 from "../assets/slides/banner1.png";
import slide2 from "../assets/slides/banner2.png";
import slide3 from "../assets/slides/banner3.png";
import slide4 from "../assets/slides/banner4.png";
import slide5 from "../assets/slides/banner5.png";
import slide6 from "../assets/slides/anhsanpham.png";
import slide7 from "../assets/slides/anh1.webp";
import slide8 from "../assets/slides/anh2.webp";
import slide9 from "../assets/slides/anh3.webp";
import logo1 from "../assets/partners/p1.jpg";
import logo2 from "../assets/partners/in7.png";
import logo3 from "../assets/partners/dnv.png";
import logo4 from "../assets/partners/thep.png";
import logo5 from "../assets/partners/trungdung.svg";
const slides = [
  {
    image: slide1,
  },
  {
    image: slide2,
  },
  {
    image: slide3,
  },
  {
    image: slide4,
  },
  {
    image: slide5,
  },
];
const partners = [
  { name: "An Bình", logo: logo1, url: "http://anbinhprinting.com/" },
  { name: "In số 7", logo: logo2, url: "https://www.in7.com.vn/" },
  { name: "Đông Nam Việt", logo: logo3, url: "https://dnvpack.vn/"},
  { name: "Thép Pomina", logo: logo4, url: "http://www.pomina-steel.com/" },
  { name: "Trung Dũng", logo: logo5, url: "https://trungdungsteel.com/"   },
];
const managementPillars = [
  {
    title: "QUẢN TRỊ TÀI CHÍNH",
    description:
      "Lập kế hoạch doanh thu, chi phí quản lý, lợi nhuận. Reminder các khoản vay đáo hạn,  công nợ đến hạn thanh toán.  Phân tích các chỉ số tài chính.",
  },
  {
    title: "QUẢN TRỊ SẢN XUẤT",

    description:
      "Áp dụng QRcode lập kế hoạch sản xuất,  thống kê sản lượng công đoạn, kiểm soát chất lượng sản phẩm KCS.  Truy vấn nguồn gốc, lệnh cấp phát nguyên vật liệu.",
  },
  {
    title: "QUẢN TRỊ NỘI BỘ",
    description:
      "Quản lý thông tin khách hàng, nhà cung cấp. Xây dựng chính sách bán hàng, chăm sóc khách hàng, chế độ đãi ngộ nhân sự . Phân tích hiệu quả hoạt động SXKD.",
  },
];

const productItems = [
  { label: "NÂNG CẤP DASHBOARD BI", to: "/san-pham/nang-cap-dashboard-bi" },
  { label: "KẾ TOÁN TÀI CHÍNH", to: "/san-pham/ke-toan-tai-chinh" },
  { label: "QUẢN LÝ MUA HÀNG", to: "/san-pham/mua-hang" },
  { label: "QUẢN TRỊ SẢN XUẤT", to: "/san-pham/quan-tri-san-xuat" },
  { label: "QUẢN LÝ BÁN HÀNG", to: "/san-pham/ban-hang" },
  { label: "QUẢN LÝ HÀNG TỒN KHO", to: "/san-pham/quan-ly-hang-ton-kho" },
  { label: "QUẢN LÝ CHI PHÍ - GIÁ THÀNH", to: "/san-pham/quan-ly-chi-phi-gia-thanh" },
  { label: "QUẢN LÝ NHÂN SỰ - TÍNH LƯƠNG", to: "/san-pham/quan-ly-nhan-su-tinh-luong" },
  { label: "QUAN HỆ KHÁCH HÀNG - CRM", to: "/san-pham/quan-he-khach-hang-crm" },
];

const solutionItems = [
  {
    title: "Giải Pháp Hóa Đơn Điện Tử Rs-Invoice",
    to: "/giai-phap/hoa-don-dien-tu",
    image: slide7,
  },
  {
    title: "Giải Pháp Sợi - Dệt - Nhuộm - May",
    to: "/giai-phap/soi-det-nhuom-may",
    image: slide8,
  },
  {
    title: "Giải Pháp Tồn Kho Barcode",
    to: "/giai-phap/barcode",
    image: slide9,
  },
];

const integrationItems = [
  { label: "Barcode - Trạm cân", to: "/tich-hop/barcode-tram-can" },
  { label: "Rosy_GP Monitor sản xuất", to: "/tich-hop/rosy-gp-monitor-san-xuat" },
  { label: "Rosy web", to: "/tich-hop/rosy-web" },
];

const qualityCommitments = [
  "Tận tâm trong toàn bộ quá trình triển khai và hỗ trợ.",
  "Chuyên nghiệp từ tư vấn quy trình đến đào tạo sử dụng.",
  "Lắng nghe để tinh chỉnh giải pháp phù hợp thực tế vận hành.",
  "Trung thực trong cam kết, tiến độ và chất lượng bàn giao.",
];

const newsHighlights = [
  {
    title: "ROSY sẵn sàng đáp ứng Thông tư 99/2025/TT-BTC",
    description: "Giải pháp chuyển đổi kế toán toàn diện cho doanh nghiệp từ 01/01/2026.",
    to: "/tin-tuc",
  },
  {
    title: "Top 5 ứng dụng AI phổ biến nhất hiện nay",
    description: "Những cách AI đang giúp doanh nghiệp phân tích dữ liệu và tự động hóa quy trình.",
    to: "/tin-tuc",
  },
  {
    title: "Xu hướng ERP 2026 trong quản trị doanh nghiệp",
    description: "Tập trung vào dữ liệu vận hành, AI trong ERP và triển khai theo ngành.",
    to: "/tin-tuc",
  },
];

const coreStatements = [
  {
    title: "Tầm nhìn",
    text: "Trở thành đối tác ERP đáng tin cậy, đồng hành dài hạn cùng doanh nghiệp Việt.",
  },
  {
    title: "Sứ mệnh",
    text: "Cung cấp giải pháp quản trị thực tiễn, giúp doanh nghiệp vận hành hiệu quả và phát triển bền vững.",
  },
  {
    title: "Giá trị cốt lõi",
    text: "Tận tâm - Chuyên nghiệp - Lắng nghe - Trung thực trong mọi dự án và dịch vụ.",
  },
];

const projectFields = [
  "Quản trị ERP chuyên sâu ngành sắt thép",
  "ERP ROSY chuyên ngành may mặc - dệt vải",
  "ERP ROSY chuyên ngành BĐS - xây dựng",
  "ERP ROSY chuyên sâu ngành bao bì, in ấn",
  "ERP ROSY chuyên sâu ngành thực phẩm - nông nghiệp",
  "ERP ROSY chuyên ngành vận chuyển - logistics",
  "ERP ROSY chuyên ngành nội thất",
  "ERP ROSY chuyên ngành dược phẩm - hóa chất",
  "ERP ROSY giải pháp chuyên sâu đa ngành",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="pt-6 pb-12 md:pt-8">
      <div className="w-full">
        <div className="relative h-[460px] w-full overflow-hidden border-y border-slate-200 md:h-[620px]">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image} alt="Rosy ERP banner" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-linear-to-r from-slate-900/20 via-slate-900/5 to-transparent" />
          </div>
        ))}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow hover:bg-white"
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow hover:bg-white"
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>
      </div>

      <div className=" mt-10 w-full px-0">
        <div className="w-full overflow-hidden rounded-none border-y border-cyan-300/30 bg-linear-to-r from-sky-900 via-blue-800 to-cyan-700 shadow-xl">
          <div className="px-6 pb-10 pt-8 md:px-10 lg:px-14">
            <div className="flex justify-center">
              <div className="inline-flex rounded-full border border-cyan-200/40 bg-cyan-200/15 px-6 py-2.5 text-lg font-bold uppercase tracking-wider text-cyan-100 md:text-xl">
                ROSY CHUYÊN VỀ
              </div>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {managementPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  
                  <h3 className="text-4xl font-extrabold uppercase leading-tight text-white/95">{pillar.title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-100/90">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md mt-10 w-full px-0">
        <section className="w-full rounded-none border-y border-slate-200 bg-white px-6 py-8 shadow-lg md:px-10 md:py-10 lg:px-14">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <h2 className="text-4xl font-extrabold uppercase tracking-wide text-slate-800">Sản phẩm ERP ROSY</h2>
              <p className="mt-3 text-2xl font-semibold uppercase text-slate-600">TỔNG QUAN VỀ PHẦN MỀM ERP ROSY</p>
              <p className="mt-4 text-base leading-8 text-slate-700">
              Phần mềm ROSY là một giải pháp ERP tổng thể được xây dựng và phát triển để đáp ứng nhu cầu Quản trị Tài chính – Quản trị Sản xuất – Quản trị Nội bộ của Doanh nghiệp
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {productItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-lg bg-cyan-600 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-cyan-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 md:col-span-7">
              <img
                src={slide6}
                alt="So do tong quan san pham ERP Rosy"
                className="h-auto w-full rounded-xl object-contain"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 w-full border-y border-cyan-300/40 bg-linear-to-r from-sky-800 to-cyan-700 px-6 py-10 md:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-white md:text-4xl">
            ERP Rosy - Chuyên ngành
          </h2>
          <div className="mx-auto mt-2 h-1 w-44 rounded-full bg-yellow-300" />

          <div className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
            {solutionItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group rounded-2xl bg-white/10 p-5 text-center text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="mx-auto h-52 w-52 overflow-hidden rounded-full border-4 border-white/80 shadow-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-2xl font-bold leading-tight">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 w-full border-y border-cyan-200/50 bg-linear-to-r from-sky-50 to-cyan-50 px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-sky-900 md:text-4xl">
            ERP Rosy - Tích hợp
          </h2>
          <div className="mx-auto mt-2 h-1 w-44 rounded-full bg-yellow-300" />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {integrationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl border-2 border-cyan-600 bg-white/80 px-6 py-5 text-center text-xl font-semibold text-cyan-800 transition hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

   

      <section className="mt-10 w-full border-y border-slate-200 bg-white px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-slate-800 md:text-4xl">
            Chính sách chất lượng
          </h2>
          <p className="mx-auto mt-4 max-w-5xl text-center text-base leading-8 text-slate-700">
            ROSY tập trung chuyển giao chương trình tối ưu thông qua quy trình tư vấn - cài đặt - đào tạo - chỉnh
            sửa, nhằm giúp phần mềm ứng dụng hiệu quả trong doanh nghiệp.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {qualityCommitments.map((item) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-base font-medium leading-7 text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 w-full px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-slate-800 md:text-4xl">
            Tin tức
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-cyan-500" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {newsHighlights.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold leading-tight text-slate-800">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
                <Link to={item.to} className="mt-5 inline-block font-semibold text-cyan-700 hover:text-cyan-800">
                  Xem chi tiết
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 w-full border-y border-cyan-300/40 bg-linear-to-r from-sky-900 to-cyan-800 px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-white md:text-4xl">
            Our Vision
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-yellow-300" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {coreStatements.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white">
                <h3 className="text-2xl font-bold uppercase tracking-wide">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-cyan-100">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-lg font-semibold uppercase tracking-wide text-yellow-200">
            Chúng tôi cam kết các quyền lợi khách hàng khi sử dụng sản phẩm và dịch vụ của ROSY.
          </p>
        </div>
      </section>

      <section className="mt-10 w-full px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-slate-800 md:text-4xl">
            Các dự án của chúng tôi
          </h2>
          <p className="mt-3 text-center text-base text-slate-600">Sắp xếp theo một số lĩnh vực kinh doanh chính</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectFields.map((field) => (
              <article key={field} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="font-semibold text-slate-700">{field}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    

<section className="mt-10 w-full">

{/* HEADER */}
<div className="w-full bg-gradient-to-r from-sky-700 to-cyan-600 py-10 text-center">
  <h2 className="text-4xl font-extrabold text-yellow-300">
    LIÊN HỆ
  </h2>
  <div className="mx-auto mt-3 h-1 w-24 bg-yellow-300 rounded"></div>
</div>

{/* MAP FULL WIDTH */}
<div className="relative w-screen h-[500px] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">

  {/* GOOGLE MAP */}
  <iframe
    src="https://www.google.com/maps?q=1B%20Điện%20Biên%20Phủ%20Bình%20Thạnh&output=embed"
    className="w-full h-full"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen=""
  ></iframe>

  {/* TEXT (KHÔNG CHẶN CLICK) */}
  {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <p className="text-white text-xl font-semibold bg-black/40 px-4 py-2 rounded">
      Sử dụng ctrl + cuộn để thu phóng bản đồ
    </p>
  </div> */}

  {/* SHAPE DƯỚI */}
  {/* <div className="absolute bottom-0 left-0 w-full">
    <svg viewBox="0 0 1440 120" className="w-full">
      <path
        fill="#0f172a"
        d="M0,64L120,80C240,96,480,128,720,122.7C960,117,1200,75,1320,53.3L1440,32V160H0Z"
      ></path>
    </svg>
  </div> */}

</div>

</section>

      <footer className="mt-10 w-full bg-slate-900 px-6 py-12 text-slate-100 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold uppercase">Liên hệ</h3>
            <p className="mt-3 leading-7 text-slate-300">
              Tòa nhà GIC 1B Điện Biên Phủ, P25, Q.Bình Thạnh, TP Hồ Chí Minh
            </p>
            <p className="mt-2 text-slate-300">Điện thoại: (028) 3514 6734 - 35 - 36</p>
            <p className="mt-2 text-slate-300">Hotline: 0908 743879</p>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase">Về Rosy ERP</h3>
            <div className="mt-3 grid gap-2">
              <Link to="/ve-chung-toi" className="text-slate-300 hover:text-white">
                Giới thiệu
              </Link>
              <Link to="/san-pham" className="text-slate-300 hover:text-white">
                Sản phẩm
              </Link>
              <Link to="/dich-vu" className="text-slate-300 hover:text-white">
                Dịch vụ
              </Link>
              <Link to="/giai-phap" className="text-slate-300 hover:text-white">
                Giải pháp
              </Link>
              <Link to="/tin-tuc" className="text-slate-300 hover:text-white">
                Tin tức
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase">Sản phẩm</h3>
            <div className="mt-3 grid gap-2">
              <Link to="/san-pham/mua-hang" className="text-slate-300 hover:text-white">
                Quản lý mua hàng
              </Link>
              <Link to="/san-pham/ban-hang" className="text-slate-300 hover:text-white">
                Quản lý bán hàng
              </Link>
              <Link to="/san-pham/quan-ly-hang-ton-kho" className="text-slate-300 hover:text-white">
                Quản lý hàng tồn kho
              </Link>
              <Link to="/san-pham/ke-toan-tai-chinh" className="text-slate-300 hover:text-white">
                Kế toán tài chính
              </Link>
              <Link to="/san-pham/quan-tri-san-xuat" className="text-slate-300 hover:text-white">
                Quản trị sản xuất
              </Link>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl border-t border-slate-700 pt-6 text-sm text-slate-400">
          © Bản quyền thuộc về CÔNG TY CỔ PHẦN PHẦN MỀM ROSY
        </p>
      </footer>
    </section>
  );
}
