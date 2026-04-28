export const productSidebarGroups = [
  {
    title: "Tổng quan phần mềm ERP ROSY",
    items: [
      { label: "Tính năng nổi bật", href: "/san-pham/tinh-nang-noi-bat" },
      { label: "Tổng quan phần mềm", href: "/san-pham/tong-quan" },
    ],
  },
  {
    title: "Sản phẩm chuẩn",
    items: [
      { label: "Quản lý chi phí - Giá thành", href: "/san-pham/quan-ly-chi-phi-gia-thanh" },
      { label: "Quản lý TSCĐ - CCDC", href: "/san-pham/quan-ly-tscd-ccdc" },
      { label: "Quản lý hàng tồn kho", href: "/san-pham/quan-ly-hang-ton-kho" },
      { label: "Quản lý bán hàng", href: "/san-pham/ban-hang" },
      { label: "Quản lý mua hàng", href: "/san-pham/mua-hang" },
      { label: "Kế toán tài chính", href: "/san-pham/ke-toan-tai-chinh" },
    ],
  },
  {
    title: "Sản phẩm chuyên sâu",
    items: [
      { label: "Nâng cấp Dashboard BI", href: "/san-pham/nang-cap-dashboard-bi" },
      { label: "Kết nối trạm cân", href: "/san-pham/ket-noi-tram-can" },
      { label: "Quản lý tồn kho bằng Barcode", href: "/san-pham/quan-ly-ton-kho-bang-barcode" },
      { label: "Quan hệ khách hàng - CRM", href: "/san-pham/quan-he-khach-hang-crm" },
      { label: "Quản lý nhân sự - Tính lương", href: "/san-pham/quan-ly-nhan-su-tinh-luong" },
      { label: "ROSY WEB", href: "/san-pham/rosy-web" },
      { label: "Quản trị sản xuất", href: "/san-pham/quan-tri-san-xuat" },
    ],
  },
];

const simplePageByPath = {
  "/san-pham/tinh-nang-noi-bat": {
    title: "Tính năng nổi bật",
    breadcrumbs: [
      { label: "Trang chủ", href: "/" },
      { label: "Sản phẩm", href: "/san-pham" },
      { label: "Tính năng nổi bật", href: "/san-pham/tinh-nang-noi-bat" },
    ],
    sidebar: "products",
    hero: {
      kicker: "Phần mềm ROSY là phần mềm ERP",
      bullets: [
        "Quản lý dữ liệu tập trung của nhiều bộ phận trên cùng 1 database, cho phép kế thừa dữ liệu giữa các bộ phận với nhau. Có thể triển khai từng bộ phận theo từng giai đoạn.",
        "Chỉnh sửa phần mềm theo yêu cầu đặc thù ban đầu và trong quá trình triển khai.",
      ],
    },
    sections: [
      {
        heading: "Tính kế thừa",
        bullets: [
          "Cho phép kế thừa dữ liệu liên hoàn từ các phiếu với nhau.",
          "Giảm thiểu số lần thao tác nhập liệu.",
          "Dữ liệu tập trung, phát sinh từ 01 phòng ban → kế thừa qua các phòng ban khác.",
        ],
      },
      {
        heading: "Xây dựng hệ thống nghiệp vụ & nhập liệu theo nghiệp vụ",
        text: "Giúp thao tác nhập liệu các nghiệp vụ phát sinh nhanh và chính xác ngay từ bước nhập liệu đầu tiên.",
      },
      {
        heading: "Tính đa nhiệm",
        bullets: [
          "Cho phép cùng 01 thời điểm có thể mở cùng lúc nhiều cửa sổ/phân hệ.",
          "Vừa nhập hóa đơn vừa kiểm tra báo cáo công nợ, tồn kho liên quan.",
        ],
      },
      {
        heading: "Tính công nghệ",
        bullets: [
          "Ngôn ngữ lập trình C#.Net, database SQL Server, font chuẩn quốc tế Unicode.",
          "Tích hợp nhiều ngôn ngữ: Anh – Việt – Hoa.",
          "Phù hợp với nhiều hệ điều hành Windows.",
          "Cài đặt phân quyền trên Server theo cơ chế Client – Server, nhập liệu online từ nhiều địa điểm khác nhau thông qua đường truyền VPN.",
        ],
      },
      {
        heading: "Chế độ lưu trữ và bảo trì Database",
        bullets: [
          "Backup tự động: Chế độ backup database tự động định kỳ theo thời gian đã khai báo.",
          "Cơ chế phân vùng dữ liệu sau backup → giải phóng dung lượng cho máy Server & client.",
          "Đồng bộ dữ liệu: Đồng bộ database dữ liệu từ nhiều điểm tương tác về cùng Database.",
        ],
      },
      {
        heading: "Phương thức cài đặt",
        bullets: [
          "Phần mềm ROSY cài đặt trên máy chủ và không hạn chế số lượng máy trạm (mạng LAN, Internet, VPN).",
          "Chạy trên hệ điều hành Windows 32 bit hoặc 64 bit (tùy cấu hình).",
        ],
      },
      {
        heading: "Hệ thống báo cáo theo sơ đồ Chart",
        text: "Hệ thống báo cáo trong ROSY được hiển thị dạng lưới và biểu đồ, hỗ trợ theo dõi nhanh các chỉ số quản trị.",
      },
      {
        heading: "Các đặc tính khác trong phần mềm",
        blocks: [
          {
            title: "Cơ chế Drilldown",
            text: "Cho phép truy xuất dữ liệu từ báo cáo tổng hợp về sổ chi tiết.",
            
          },
          {
            title: "Quản lý người dùng",
            text: "Quản lý và phân quyền chặt chẽ đến từng nhóm người dùng & từng người dùng theo chức năng nhiệm vụ. Kiểm soát nhật ký thao tác của người dùng trên hệ thống.",
          },
          {
            title: "Nhật ký dữ liệu",
            bullets: [
              "Ghi chép lại các giao dịch trong ngày trên từng user.",
              "Lưu các trạng thái: ghi – xem – sửa – xóa theo từng dòng thời gian.",
            ],
          },
          {
            title: "Hệ thống cảnh báo",
            text: "Cảnh báo theo từng phân hệ: thu chi, công nợ đến hạn, hàng tồn kho vượt mức an toàn, doanh thu, chi phí, cảnh báo duyệt chứng từ…",
          },
          {
            title: "Tích hợp với Excel",
            bullets: [
              "Import & export dữ liệu theo template Excel.",
              "Import chứng từ/danh mục/số dư đầu.",
              "Export báo cáo.",
            ],
          },
          {
            title: "Copy dữ liệu",
            bullets: ["Copy chứng từ.", "Copy dòng dữ liệu trong cùng 01 chứng từ."],
          },
          {
            title: "Cập nhật tự động (Live update)",
            text: "ROSY upload tính năng lên website và tự động cảnh báo trên chương trình; khách hàng chọn tự động cập nhật chức năng mới nhất vào phần mềm.",
          },
          {
            title: "Kiểm tra logic dữ liệu",
            text: "Bao gồm các kiểm tra logic dữ liệu trong kế toán.",
          },
          {
            title: "Kết nối thiết bị ngoại vi",
            text: "Kết nối máy chấm công – barcode – trạm cân – camera vào phần mềm.",
          },
          {
            title: "Đồng bộ với phần mềm HTKK",
            text: "Kết nối và truyền dữ liệu trực tiếp đến phần mềm hỗ trợ kê khai thuế.",
          },
        ],
      },
    ],
    source: {
      label: "Tham khảo nội dung gốc",
      href: "https://rosysoft.vn/san-pham/tong-quan-phan-mem-erp-rosy/tinh-nang-noi-bat",
    },
  },

  "/san-pham/tong-quan": {
    title: "Tổng quan",
    breadcrumbs: [
      { label: "Trang chủ", href: "/" },
      { label: "Sản phẩm", href: "/san-pham" },
      { label: "Tính năng nổi bật", href: "/san-pham/tinh-nang-noi-bat" },
    ],
    sidebar: "products",
    hero: {
      kicker: "Phần mềm ROSY là phần mềm ERP",
      bullets: [
        "Quản lý dữ liệu tập trung của nhiều bộ phận trên cùng 1 database, cho phép kế thừa dữ liệu giữa các bộ phận với nhau. Có thể triển khai từng bộ phận theo từng giai đoạn.",
        "Chỉnh sửa phần mềm theo yêu cầu đặc thù ban đầu và trong quá trình triển khai.",
      ],
    },
    sections: [
      {
        heading: "Tính kế thừa",
        bullets: [
          "Cho phép kế thừa dữ liệu liên hoàn từ các phiếu với nhau.",
          "Giảm thiểu số lần thao tác nhập liệu.",
          "Dữ liệu tập trung, phát sinh từ 01 phòng ban → kế thừa qua các phòng ban khác.",
        ],
      },
      {
        heading: "Xây dựng hệ thống nghiệp vụ & nhập liệu theo nghiệp vụ",
        text: "Giúp thao tác nhập liệu các nghiệp vụ phát sinh nhanh và chính xác ngay từ bước nhập liệu đầu tiên.",
      },
      {
        heading: "Tính đa nhiệm",
        bullets: [
          "Cho phép cùng 01 thời điểm có thể mở cùng lúc nhiều cửa sổ/phân hệ.",
          "Vừa nhập hóa đơn vừa kiểm tra báo cáo công nợ, tồn kho liên quan.",
        ],
      },
      {
        heading: "Tính công nghệ",
        bullets: [
          "Ngôn ngữ lập trình C#.Net, database SQL Server, font chuẩn quốc tế Unicode.",
          "Tích hợp nhiều ngôn ngữ: Anh – Việt – Hoa.",
          "Phù hợp với nhiều hệ điều hành Windows.",
          "Cài đặt phân quyền trên Server theo cơ chế Client – Server, nhập liệu online từ nhiều địa điểm khác nhau thông qua đường truyền VPN.",
        ],
      },
      {
        heading: "Chế độ lưu trữ và bảo trì Database",
        bullets: [
          "Backup tự động: Chế độ backup database tự động định kỳ theo thời gian đã khai báo.",
          "Cơ chế phân vùng dữ liệu sau backup → giải phóng dung lượng cho máy Server & client.",
          "Đồng bộ dữ liệu: Đồng bộ database dữ liệu từ nhiều điểm tương tác về cùng Database.",
        ],
      },
      {
        heading: "Phương thức cài đặt",
        bullets: [
          "Phần mềm ROSY cài đặt trên máy chủ và không hạn chế số lượng máy trạm (mạng LAN, Internet, VPN).",
          "Chạy trên hệ điều hành Windows 32 bit hoặc 64 bit (tùy cấu hình).",
        ],
      },
      {
        heading: "Hệ thống báo cáo theo sơ đồ Chart",
        text: "Hệ thống báo cáo trong ROSY được hiển thị dạng lưới và biểu đồ, hỗ trợ theo dõi nhanh các chỉ số quản trị.",
      },
      {
        heading: "Các đặc tính khác trong phần mềm",
        blocks: [
          {
            title: "Cơ chế Drilldown",
            text: "Cho phép truy xuất dữ liệu từ báo cáo tổng hợp về sổ chi tiết.",
            
          },
          {
            title: "Quản lý người dùng",
            text: "Quản lý và phân quyền chặt chẽ đến từng nhóm người dùng & từng người dùng theo chức năng nhiệm vụ. Kiểm soát nhật ký thao tác của người dùng trên hệ thống.",
          },
          {
            title: "Nhật ký dữ liệu",
            bullets: [
              "Ghi chép lại các giao dịch trong ngày trên từng user.",
              "Lưu các trạng thái: ghi – xem – sửa – xóa theo từng dòng thời gian.",
            ],
          },
          {
            title: "Hệ thống cảnh báo",
            text: "Cảnh báo theo từng phân hệ: thu chi, công nợ đến hạn, hàng tồn kho vượt mức an toàn, doanh thu, chi phí, cảnh báo duyệt chứng từ…",
          },
          {
            title: "Tích hợp với Excel",
            bullets: [
              "Import & export dữ liệu theo template Excel.",
              "Import chứng từ/danh mục/số dư đầu.",
              "Export báo cáo.",
            ],
          },
          {
            title: "Copy dữ liệu",
            bullets: ["Copy chứng từ.", "Copy dòng dữ liệu trong cùng 01 chứng từ."],
          },
          {
            title: "Cập nhật tự động (Live update)",
            text: "ROSY upload tính năng lên website và tự động cảnh báo trên chương trình; khách hàng chọn tự động cập nhật chức năng mới nhất vào phần mềm.",
          },
          {
            title: "Kiểm tra logic dữ liệu",
            text: "Bao gồm các kiểm tra logic dữ liệu trong kế toán.",
          },
          {
            title: "Kết nối thiết bị ngoại vi",
            text: "Kết nối máy chấm công – barcode – trạm cân – camera vào phần mềm.",
          },
          {
            title: "Đồng bộ với phần mềm HTKK",
            text: "Kết nối và truyền dữ liệu trực tiếp đến phần mềm hỗ trợ kê khai thuế.",
          },
        ],
      },
    ],
    source: {
      label: "Tham khảo nội dung gốc",
      href: "https://rosysoft.vn/san-pham/tong-quan-phan-mem-erp-rosy/tinh-nang-noi-bat",
    },
  },

  "/ve-chung-toi": {
    title: "Về chúng tôi",
    breadcrumbs: [
      { label: "Trang chủ", href: "/" },
      { label: "Về chúng tôi", href: "/ve-chung-toi" },
    ],
    hero: {
      kicker: "Công ty Cổ phần Phần mềm ROSY",
      bullets: [
        "Được thành lập từ năm 2007, ROSY là đơn vị phát triển các giải pháp phần mềm ERP cho doanh nghiệp trên nền tảng C#.Net và SQL Server.",
        "ROSY cung cấp hệ sinh thái gồm kế toán, mua hàng, bán hàng, tồn kho, sản xuất, CRM, nhân sự - tiền lương, quản lý máy móc thiết bị và ROSY Web.",
      ],
    },
    sections: [
      {
        heading: "Giới thiệu",
        text: "Trụ sở chính của ROSY đặt tại TP.HCM và có chi nhánh tại Hà Nội. Với đội ngũ chuyên gia và kỹ sư phụ trách theo từng module, công ty hướng đến việc cung cấp giải pháp phần mềm chuyên sâu, đa dạng và phù hợp với nhu cầu quản trị ngày càng cao của doanh nghiệp.",
        blocks: [
          {
            title: "Các module giải pháp",
            bullets: [
              "Module Kế toán (ROSY-Accounting).",
              "Module Quản lý Mua hàng (ROSY-Purchasing Management).",
              "Module Quản lý Bán hàng (ROSY-Selling Management).",
              "Module Quản lý Hàng tồn kho (ROSY-Inventory Management).",
              "Module Quản trị sản xuất (ROSY-Manufacturing Resource Planning).",
              "Module Quan hệ khách hàng (ROSY-Customer Relationship Management).",
              "Module Nhân sự - Tiền lương (ROSY-Human Resources Management).",
              "Module Quản lý Máy móc Thiết bị (ROSY-Machine Maintenance).",
              "Module ROSY Web.",
            ],
          },
          {
            title: "Định hướng phát triển",
            text: "ROSY không ngừng nghiên cứu, phát triển sản phẩm, nâng cao tốc độ xử lý và bổ sung tính năng thông minh nhằm hỗ trợ doanh nghiệp ra quyết định nhanh và chính xác hơn. Song song đó là các dịch vụ bảo trì phần mềm, xây dựng quy trình và tư vấn giải pháp quản lý.",
          },
        ],
      },
      {
        heading: "Tầm nhìn - sứ mạng",
        bullets: [
          "Đầu tư công nghệ và công cụ phát triển hiện đại để tạo ra các giải pháp quản trị chuyên sâu cho doanh nghiệp Việt Nam.",
          "Tích lũy kinh nghiệm triển khai thực tế để liên tục hoàn thiện sản phẩm và nâng cao chất lượng dịch vụ.",
          "Mang đến hệ thống phần mềm phù hợp đặc thù quản lý của từng doanh nghiệp, giúp vận hành hiệu quả và bền vững.",
        ],
      },
      {
        heading: "Chính sách chất lượng & dịch vụ",
        text: "ROSY xác định trách nhiệm đối với khách hàng không chỉ nằm ở chất lượng sản phẩm mà còn ở toàn bộ quá trình tư vấn, cài đặt, đào tạo và đồng hành sau triển khai.",
        blocks: [
          {
            title: "Cam kết triển khai",
            bullets: [
              "Tận tâm, chuyên nghiệp, lắng nghe và trung thực trong suốt quy trình tư vấn giải pháp, cài đặt, đào tạo và chỉnh sửa chương trình.",
              "Lắng nghe ý kiến đóng góp của khách hàng để hoàn thiện sản phẩm và nâng cao chất lượng dịch vụ.",
            ],
          },
          {
            title: "Liên hệ chăm sóc khách hàng",
            bullets: [
              "Hotline: 0908 743 879 (Mrs. Hạnh).",
              "Điện thoại: (08) 35146735.",
              "Email: support@rosysoft.vn.",
            ],
          },
        ],
      },
      {
        heading: "Chính sách nhân sự",
        text: "Với phương châm 'Nhân sự là cốt lõi của công ty', ROSY chú trọng xây dựng và phát triển đội ngũ kỹ sư trẻ, năng động, tài giỏi và nhiệt huyết; phần lớn được đào tạo trong các lĩnh vực tài chính, kế toán và công nghệ thông tin.",
        blocks: [
          {
            title: "Triết lý con người",
            text: "Nguồn nhân lực của ROSY am hiểu lĩnh vực tài chính, chuyên sâu về giải pháp ứng dụng CNTT vào thực tiễn, làm việc với phương châm 'Sản phẩm chuyên nghiệp, tư vấn tận tường & hiệu quả, dịch vụ tận tâm & chu đáo'.",
          },
          {
            title: "Mục tiêu phát triển",
            text: "Công ty không ngừng tìm tòi phương pháp và công nghệ mới để tối ưu chất lượng sản phẩm trước khi đến tay khách hàng, đồng thời xem chuyển giao tri thức, tư vấn và đào tạo là một phần quan trọng trong giá trị cung cấp.",
          },
        ],
      },
      {
        heading: "Giá trị cốt lõi",
        bullets: [
          "Lấy chất lượng sản phẩm và hiệu quả vận hành của khách hàng làm trung tâm.",
          "Đề cao tinh thần tận tâm, chuyên nghiệp, lắng nghe và cải tiến liên tục.",
          "Phát triển đội ngũ nhân sự vững chuyên môn, giàu nhiệt huyết và trách nhiệm.",
        ],
      },
      {
        heading: "Chính sách bảo mật",
        text: "ROSY ưu tiên quyền riêng tư và bảo mật thông tin khách hàng trong suốt quá trình cung cấp sản phẩm, dịch vụ.",
        blocks: [
          {
            title: "Mục đích thu thập và sử dụng thông tin",
            bullets: [
              "Quản lý và cấp quyền sử dụng sản phẩm, dịch vụ.",
              "Liên hệ, thông báo khi sản phẩm hoặc dịch vụ có thay đổi, cập nhật mới.",
              "Nhắc gia hạn bảo hành dịch vụ và thời hạn hợp đồng.",
              "Thực hiện hỗ trợ và chăm sóc khách hàng sau bán hàng.",
              "Giải quyết khiếu nại, tranh chấp nếu có.",
            ],
          },
          {
            title: "Lưu trữ và bảo mật",
            bullets: [
              "Thông tin được lưu trữ đến khi không còn cần thiết cho mục đích sử dụng hoặc khi khách hàng yêu cầu xóa.",
              "ROSY cam kết không chia sẻ, bán hoặc cho thuê thông tin cho bên thứ ba khi chưa có sự cho phép.",
              "Công ty thực hiện kiểm tra định kỳ, cập nhật hệ thống và đào tạo nhân viên về quyền riêng tư, bảo mật thông tin.",
            ],
          },
          {
            title: "Tích hợp bên thứ ba",
            text: "Khi tích hợp với nền tảng, dịch vụ bên thứ ba, ROSY chỉ chia sẻ thông tin cần thiết và được phép để thực hiện tính năng khách hàng yêu cầu, đồng thời ưu tiên các đối tác có tiêu chuẩn bảo mật tương đương.",
          },
          {
            title: "Đơn vị chịu trách nhiệm bảo mật",
            bullets: [
              "Tên đơn vị: Công ty Cổ phần Phần mềm ROSY.",
              "Địa chỉ: Tòa nhà Gicland, 1B Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP.HCM.",
              "Số điện thoại: (028) 3514 6734 - 35 - 36.",
              "Email: office@rosysoft.vn.",
              "Website: rosysoft.vn.",
            ],
          },
        ],
      },
      {
        heading: "Thông tin liên hệ",
        blocks: [
          {
            title: "Văn phòng",
            bullets: [
              "Tòa nhà GIC, 1B Điện Biên Phủ, P25, Q.Bình Thạnh, TP.HCM.",
              "Điện thoại: (028) 3514 6734 - 35 - 36.",
              "Hotline: 0908 743 879.",
            ],
          },
          {
            title: "Dấu ấn doanh nghiệp",
            text: "Sau nhiều năm hiện diện trên thị trường, ROSY đã triển khai giải pháp phần mềm cho hàng trăm khách hàng thuộc nhiều lĩnh vực khác nhau và tiếp tục hoàn thiện sản phẩm dựa trên kinh nghiệm triển khai thực tế.",
          },
        ],
      },
    ],
    source: {
      label: "Tham khảo nội dung gốc",
      href: "https://rosysoft.vn/gioi-thieu",
    },
  },
};

export function getSimplePageConfig(pathname, titleFromRoute) {
  if (simplePageByPath[pathname]) return simplePageByPath[pathname];

  return {
    title: titleFromRoute ?? "Nội dung",
    breadcrumbs: [{ label: "Trang chủ", href: "/" }, { label: titleFromRoute ?? "Nội dung", href: pathname }],
    sidebar: pathname?.startsWith("/san-pham/") ? "products" : null,
    hero: null,
    sections: [
      {
        heading: "Đang cập nhật",
        text: "Nội dung trang này đang được cập nhật theo thiết kế mới.",
      },
    ],
  };
}

