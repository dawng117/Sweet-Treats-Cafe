const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const User = require('./models/User');
const db = require('./config/db');

// Kết nối database
db();

// Dữ liệu mẫu cho blog
const blogPosts = [
  {
    title: 'Cách làm bánh Chocolate Cake ngon tuyệt',
    content: `Hôm nay, chúng tôi sẽ hướng dẫn bạn cách làm bánh chocolate cake thơm ngon và hấp dẫn. 
Với công thức đơn giản này, bạn có thể tự tay làm được một chiếc bánh chocolate cake hoàn hảo tại nhà. 

Đầu tiên, bạn cần chuẩn bị nguyên liệu bao gồm: bột mì đa dụng, bột cacao nguyên chất, đường, trứng, sữa tươi, bơ lạt và một chút muối. Việc chọn nguyên liệu chất lượng, đặc biệt là bột cacao, sẽ ảnh hưởng lớn đến hương vị của bánh.

Sau khi trộn đều hỗn hợp khô và lỏng, bạn nướng bánh ở nhiệt độ 175°C trong khoảng 30–35 phút. Một mẹo nhỏ để bánh mềm xốp là đừng trộn bột quá lâu, và nên kiểm tra bằng tăm để đảm bảo bánh chín đều.

Thành phẩm sẽ là một chiếc bánh chocolate đậm vị, mềm mịn và thơm ngất ngây. Bạn có thể trang trí thêm bằng ganache hoặc kem tươi để tăng độ hấp dẫn.

Hãy cùng thử và chia sẻ thành quả của bạn nhé!`,

    category: 'Công thức',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    tags: ['bánh ngọt', 'chocolate', 'công thức'],
  },
  {
    title: 'Bí quyết làm bánh không bị xẹp',
    content: `Việc bánh bị xẹp sau khi nướng là một trong những vấn đề phổ biến mà nhiều người gặp phải. 
    Trong bài viết này, chúng tôi sẽ chia sẻ những bí quyết giúp bánh của bạn luôn giữ được form đẹp và độ nở chuẩn.
    
    Nguyên nhân chính khiến bánh bị xẹp là do đánh trứng chưa đủ bông, lò nướng không đủ nhiệt hoặc mở cửa lò quá sớm. Hãy luôn đảm bảo trứng được đánh tới giai đoạn "bông cứng", hỗn hợp bột được trộn nhẹ nhàng, và lò nướng đã được làm nóng trước ít nhất 10 phút.
    
    Ngoài ra, bạn nên sử dụng khuôn chống dính chất lượng và đặt bánh ở giữa lò khi nướng để nhiệt lan tỏa đều.
    
    Sau khi nướng, nên để bánh trong lò 5 phút rồi mới lấy ra để tránh sốc nhiệt khiến bánh sụp xuống.
    
    Với những mẹo nhỏ trên, bạn hoàn toàn có thể khắc phục tình trạng bánh bị xẹp và tự tin hơn khi làm bánh tại nhà!`,
    
    category: 'Mẹo làm bánh',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d',
    tags: ['mẹo hay', 'làm bánh', 'kỹ thuật'],
  },
  {
    title: 'Sweet Treats Cafe ra mắt menu mới',
    content: `Chào đón mùa hè, Sweet Treats Cafe hân hạnh giới thiệu menu mới với nhiều món bánh và đồ uống hấp dẫn. 
    Đặc biệt, chúng tôi có các loại trà hoa quả tươi mát và bánh kem mát lạnh, giúp bạn giải nhiệt và thưởng thức trọn vẹn hương vị ngọt ngào trong những ngày nắng.
    
    Một số món nổi bật trong menu mới bao gồm: bánh mousse chanh dây, bingsu trái cây nhiệt đới, bingsu trà xanh và cà phê bơ. Mỗi món đều được đầu bếp của chúng tôi sáng tạo kỹ lưỡng, kết hợp nguyên liệu tươi mới và kỹ thuật làm bánh chuyên nghiệp.
    
    Ngoài ra, chúng tôi còn ra mắt combo trà bánh với giá ưu đãi cho nhóm 2–4 người, lý tưởng để tụ họp bạn bè hoặc họp nhóm cuối tuần.
    
    Hãy đến ngay Sweet Treats Cafe để thưởng thức và cảm nhận sự khác biệt!`,
    
    category: 'Tin tức',
    image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94',
    tags: ['menu mới', 'tin tức', 'sweet treats'],
  },
];

async function seedBlogs() {
  try {
    // Xóa tất cả blog cũ
    await Blog.deleteMany({});

    // Tìm một admin user để set làm author
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      throw new Error('Không tìm thấy tài khoản admin');
    }

    // Thêm author vào mỗi blog post
    const blogsWithAuthor = blogPosts.map(post => ({
      ...post,
      author: admin._id
    }));

    // Tạo các blog mới
    await Blog.insertMany(blogsWithAuthor);

    console.log('Đã tạo dữ liệu mẫu cho blog thành công!');
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu mẫu cho blog:', error);
  } finally {
    // Đóng kết nối database
    mongoose.connection.close();
  }
}

// Chạy seeder
seedBlogs();