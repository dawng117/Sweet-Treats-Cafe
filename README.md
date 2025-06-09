## Mô tả dự án
Tôi là sinh viên đang thực tập và làm dự án wesite Sweet Treats Cafe có tích hợp chatbox (sử dụng Tawk.to) cho báo cáo thực tập của tôi.
🧁 Mô Tả Website Bánh - Cafe - Đồ Ngọt
Tên website: Sweet Treats Café 

🎯 Mục Tiêu:
Website "Sweet Treats Café" là nền tảng trực tuyến cho phép khách hàng dễ dàng đặt bánh, cafe và đồ ngọt yêu thích từ các cửa hàng địa phương. Với giao diện hiện đại, dễ sử dụng, website này mang đến cho người dùng một trải nghiệm tiện lợi khi thưởng thức các món ngọt và thức uống yêu thích tại nhà hoặc văn phòng.

🧩 Các Chức Năng Chính:

1. Chức Năng Cho Người Dùng
   Xem danh sách sản phẩm: Các loại bánh, đồ uống, và đồ ngọt với hình ảnh, mô tả, và giá.

Tìm kiếm món ăn: Người dùng có thể tìm kiếm theo tên món, loại (bánh, đồ uống, đồ ngọt).

Thêm món vào giỏ hàng: Cho phép thêm bánh, đồ uống vào giỏ hàng, chọn số lượng và ghi chú cho món ăn (ví dụ: không đường, ít kem, v.v...).

Đặt hàng trực tuyến: Khách hàng có thể lựa chọn địa chỉ giao hàng, thanh toán và theo dõi trạng thái đơn hàng.

Đăng ký / đăng nhập: Người dùng có thể tạo tài khoản để lưu thông tin thanh toán và theo dõi lịch sử đơn hàng.

2. Chức Năng Cho Quản Trị Viên (Admin)
   Quản lý sản phẩm: Thêm, sửa, xóa các món ăn (bánh, đồ uống, đồ ngọt), bao gồm tên, mô tả, giá, hình ảnh.

Quản lý đơn hàng: Xem danh sách đơn hàng, cập nhật trạng thái đơn hàng (đang xử lý, đã giao).

Quản lý người dùng: Phân quyền, quản lý tài khoản người dùng (admin, khách hàng).

🍩 Các Loại Sản Phẩm Có Thể Bán

1. Bánh
   Bánh kem (Bánh gato, bánh mousse)

Cupcakes (Bánh nướng nhỏ với lớp kem trang trí)

Bánh quy (Chocolate chip, bơ, sữa dừa)

Tart (Tart trái cây, tart chanh)

Bánh mì ngọt (Bánh mì quế, bánh mì nho khô)

2. Cafe & Đồ Uống
   Cà phê (Cà phê sữa đá, cappuccino, latte)

Trà sữa (Trà sữa thạch, trà sữa trân châu)

Sinh tố, nước ép (Sinh tố dưa hấu, nước ép cam)

Cacao nóng, Chocolate nóng (Cho mùa lạnh)

3. Đồ Ngọt
   Bánh flan

Chè (chè đậu xanh, chè thái)

Macaron (Bánh macarons đủ màu sắc)

Kẹo, chocolate

💻 Kiến Trúc Hệ Thống
Frontend:

Vue.js: Framework JavaScript để xây dựng giao diện người dùng.

Tailwind CSS: Framework CSS để thiết kế giao diện responsive, đẹp mắt.

Vue Router: Quản lý các route trong website (Trang chủ, Giỏ hàng, Đặt hàng, etc.).

Vuex: Quản lý trạng thái ứng dụng (giỏ hàng, người dùng).

Backend:

Node.js với Express.js: Xử lý các API, xử lý đơn hàng và người dùng.

MongoDB: Lưu trữ thông tin về sản phẩm, đơn hàng và người dùng.

JWT (JSON Web Token): Xác thực người dùng (đăng nhập, đăng ký).

Mongoose: Quản lý kết nối MongoDB.

1. Các Chức Năng Chính
Chức Năng Cho Người Dùng
Xem danh sách sản phẩm:
Hiển thị các sản phẩm theo danh mục (Bánh, Cafe & Đồ uống, Đồ ngọt) với hình ảnh, mô tả, giá cả.
Lọc sản phẩm theo danh mục, giá, hoặc từ khóa tìm kiếm.
Tìm kiếm món ăn:
Tìm kiếm theo tên món hoặc danh mục (ví dụ: “bánh kem”, “cà phê”).
Hỗ trợ tìm kiếm gợi ý (autocomplete) khi nhập từ khóa.
Thêm món vào giỏ hàng:
Chọn sản phẩm, số lượng, và thêm ghi chú (ví dụ: “không đường”, “thêm kem”).
Xem lại giỏ hàng, chỉnh sửa số lượng hoặc xóa món.
Đặt hàng trực tuyến:
Nhập thông tin giao hàng (địa chỉ, số điện thoại).
Chọn phương thức thanh toán (ví dụ: MoMo, COD).
Theo dõi trạng thái đơn hàng (đang xử lý, đang giao, đã giao).
Đăng ký / Đăng nhập:
Tạo tài khoản để lưu thông tin cá nhân, lịch sử đơn hàng.
Đăng nhập qua email/mật khẩu hoặc tích hợp đăng nhập nhanh (Google, Facebook).
Chatbox (Tawk.to):
Liên hệ trực tiếp với nhân viên hỗ trợ để hỏi về sản phẩm, đơn hàng, hoặc khuyến mãi.
Hỗ trợ thời gian thực, lưu lịch sử chat để admin xem lại.
Chức Năng Cho Quản Trị Viên (Admin)
Quản lý sản phẩm:
Thêm, sửa, xóa sản phẩm (tên, mô tả, giá, hình ảnh, danh mục).
Cập nhật trạng thái sản phẩm (còn hàng, hết hàng).
Quản lý đơn hàng:
Xem danh sách đơn hàng, chi tiết đơn hàng (sản phẩm, số lượng, ghi chú).
Cập nhật trạng thái đơn hàng (xác nhận, đang giao, hoàn thành).
Gửi thông báo cho khách hàng qua email hoặc chatbox.
Quản lý người dùng:
Xem danh sách tài khoản người dùng (khách hàng, admin).
Phân quyền (admin, nhân viên hỗ trợ).
Khóa/mở tài khoản nếu cần.
Quản lý chatbox (Tawk.to):
Theo dõi và trả lời tin nhắn từ khách hàng qua dashboard Tawk.to.
Xem lịch sử chat, phân tích tương tác khách hàng.
Cài đặt câu trả lời tự động (pre-chat form, offline message).
2. Danh Mục Sản Phẩm
Bánh
Bánh kem: Bánh gato, bánh mousse (hương vị: socola, dâu, vani).
Cupcakes: Bánh nướng nhỏ với kem trang trí (hương vị: socola, dâu, matcha).
Bánh quy: Chocolate chip, bơ, sữa dừa.
Tart: Tart trái cây, tart chanh.
Bánh mì ngọt: Bánh mì quế, bánh mì nho khô.
Cafe & Đồ Uống
Cà phê: Cà phê sữa đá, cappuccino, latte, espresso.
Trà sữa: Trà sữa thạch, trà sữa trân châu (hương vị: đào, vải, ô long).
Sinh tố, nước ép: Sinh tố dưa hấu, nước ép cam, táo.
Cacao nóng, Chocolate nóng: Phù hợp cho mùa lạnh.
Đồ Ngọt
Bánh flan: Flan vani, flan cà phê.
Chè: Chè đậu xanh, chè thái, chè ba màu.
Macaron: Macaron đủ màu (hương vị: dâu, chanh, socola).
Kẹo, Chocolate: Kẹo dẻo, chocolate nhân trái cây.
3. Kiến Trúc Hệ Thống
Frontend
Framework: Vue.js (tạo giao diện người dùng động, component-based).
CSS Framework: Tailwind CSS (thiết kế responsive, hiện đại).
Routing: Vue Router (quản lý các trang: Trang chủ, Giỏ hàng, Thanh toán, Admin).
State Management: Vuex (quản lý trạng thái giỏ hàng, thông tin người dùng).
Chatbox: Tawk.to widget (tích hợp qua JavaScript, hiển thị ở góc dưới bên phải).
Backend
Framework: Node.js với Express.js (xử lý API cho sản phẩm, đơn hàng, người dùng, chat).
Database: MongoDB (lưu trữ sản phẩm, đơn hàng, thông tin người dùng).
Authentication: JWT (JSON Web Token) để xác thực đăng nhập/đăng ký.
ORM: Mongoose (tương tác với MongoDB, quản lý schema).
Chatbox Integration: Kết nối với Tawk.to API để quản lý tin nhắn và tương tác.
Deployment
Frontend: Deploy trên Netlify hoặc Vercel (hỗ trợ Vue.js dễ dàng).
Backend: Deploy trên Heroku, Render, hoặc AWS.
Database: MongoDB Atlas (dịch vụ cloud cho MongoDB).
4. Quy Trình Hoạt Động
Đăng ký/Đăng nhập:
Khách hàng tạo tài khoản hoặc đăng nhập để bắt đầu mua sắm.
Duyệt và chọn món:
Khách hàng xem danh sách sản phẩm, lọc/tìm kiếm, thêm món vào giỏ hàng.
Sử dụng chatbox Tawk.to để hỏi nhân viên về sản phẩm hoặc khuyến mãi.
Đặt hàng:
Xác nhận giỏ hàng, nhập thông tin giao hàng và thanh toán.
Nhận mã đơn hàng để theo dõi.
Xử lý đơn hàng:
Admin nhận thông báo đơn hàng mới qua dashboard hoặc email.
Cập nhật trạng thái đơn hàng (xác nhận, đang giao, hoàn thành).
Liên hệ khách hàng qua Tawk.to nếu cần xác nhận thêm thông tin.
Giao hàng và phản hồi:
Khách hàng nhận món, có thể đánh giá dịch vụ hoặc liên hệ qua chatbox để phản hồi.
5. Giao Diện Mẫu
Trang chủ:
Carousel hiển thị sản phẩm nổi bật (bánh kem, cà phê, macaron).
Menu danh mục (Bánh, Cafe & Đồ uống, Đồ ngọt).
Nút chatbox Tawk.to ở góc dưới bên phải.
Trang sản phẩm:
Lưới sản phẩm (grid layout) với hình ảnh, tên, giá, nút “Thêm vào giỏ hàng”.
Bộ lọc (theo danh mục, giá) và ô tìm kiếm.
Giỏ hàng:
Danh sách món đã chọn, tổng tiền, nút chỉnh sửa/xóa món.
Nút “Thanh toán” dẫn đến trang thanh toán.
Trang thanh toán:
Form nhập thông tin giao hàng (địa chỉ, số điện thoại).
Lựa chọn phương thức thanh toán (MoMo, COD).
Tóm tắt đơn hàng trước khi xác nhận.
Trang admin:
Dashboard với các tab: Quản lý sản phẩm, Quản lý đơn hàng, Quản lý người dùng.
Tích hợp dashboard Tawk.to để quản lý tin nhắn khách hàng.


## Cấu trúc thư mục
sweet-treats-cafe/
├── client/                           # Frontend (Vue.js)
│   ├── public/                       # Tệp tĩnh
│   │   ├── index.html                # File HTML chính, tích hợp Tawk.to
│   │   └── favicon.ico               # Biểu tượng website
│   ├── src/                          # Source code Vue.js
│   │   ├── assets/                   # Hình ảnh, font, CSS
│   │   │   ├── images/               # Hình ảnh sản phẩm
│   │   │   └── styles/               # File CSS tùy chỉnh
│   │   ├── components/               # Các component Vue
│   │   │   ├── ProductCard.vue       # Component hiển thị sản phẩm
│   │   │   ├── CartItem.vue          # Component món trong giỏ hàng
│   │   │   └── ChatBox.vue           # Component tích hợp Tawk.to (nếu tùy chỉnh)
│   │   ├── views/                    # Các trang (views)
│   │   │   ├── Home.vue              # Trang chủ
│   │   │   ├── ProductList.vue       # Trang danh sách sản phẩm
│   │   │   ├── Cart.vue              # Trang giỏ hàng
│   │   │   ├── Checkout.vue          # Trang thanh toán
│   │   │   └── AdminDashboard.vue    # Trang quản trị
│   │   ├── stores/                   # Pinia store
│   │   │   └── product.js            # Quản lý trạng thái (giỏ hàng, sản phẩm)
│   │   ├── router/                   # Vue Router
│   │   │   └── index.js              # Định nghĩa các route
│   │   ├── App.vue                   # Component gốc
│   │   └── main.js                   # File khởi tạo Vue
├── server/                           # Backend (Node.js/Express.js)
│   ├── config/                       # Cấu hình
│   │   └── db.js                     # Kết nối MongoDB
│   ├── models/                       # Mô hình MongoDB
│   │   ├── Product.js                # Schema sản phẩm
│   │   ├── Order.js                  # Schema đơn hàng
│   │   ├── User.js                   # Schema người dùng
│   ├── routes/                       # Các route API
│   │   ├── products.js               # API sản phẩm
│   │   ├── orders.js                 # API đơn hàng
│   │   ├── users.js                  # API người dùng
│   │   └── auth.js                   # API đăng nhập/đăng ký
│   ├── middleware/                   # Middleware
│   │   └── auth.js                   # Xác thực JWT
│   ├── controllers/                  # Logic xử lý API
│   │   ├── productController.js      # Xử lý sản phẩm
│   │   ├── orderController.js        # Xử lý đơn hàng
│   │   └── userController.js         # Xử lý người dùng
│   ├── index.js                      # File khởi tạo server
│   └── package.json                  # Cấu hình dependencies
├── .env                              # Biến môi trường
├── README.md                         # Hướng dẫn dự án
└── package.json                      # Cấu hình dependencies toàn dự án