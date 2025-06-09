const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect, admin } = require('../middleware/authMiddleware');

// Tạo token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/login
// @desc    Đăng nhập người dùng
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Kiểm tra email và password
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
    }
    
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
    
    // Thêm kiểm tra tài khoản bị khóa
    if (user.isLocked) {
      return res.status(403).json({ message: 'Tài khoản của bạn đã bị khóa' });
    }
    
    // Kiểm tra mật khẩu
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
    
    // Trả về thông tin người dùng và token
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      image: user.image,
      token: generateToken(user._id)
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @route   POST /api/auth/register
// @desc    Đăng ký người dùng mới
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phone, address, image } = req.body;
    // Thêm image vào destructuring
    
    // Kiểm tra các trường bắt buộc
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }
    
    // Kiểm tra email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }
    
    // Tạo người dùng mới
    const user = await User.create({
      username,
      email,
      password,
      phone: phone || '',
      address: address || '',
      image: image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y', // Thêm image
      role: 'customer'
    });
    
    if (user) {
      // Trả về thông tin người dùng và token
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        image: user.image,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
    }
    
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @route   GET /api/auth/profile
// @desc    Lấy thông tin người dùng
// @access  Private
// Thêm route để lấy thông tin profile
router.get('/profile', protect, async (req, res) => {
  try {
    // req.user đã được set bởi middleware protect
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Thêm route để cập nhật profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    // Update basic info
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    
    // Add image update support
    if (req.body.image) {
      user.image = req.body.image;
    }
    
    // Password change logic remains the same
    if (req.body.newPassword && req.body.currentPassword) {
      // Kiểm tra mật khẩu hiện tại
      const isMatch = await user.matchPassword(req.body.currentPassword);
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
      }
      
      // Cập nhật mật khẩu mới
      user.password = req.body.newPassword;
    }
    
    // Lưu thay đổi
    const updatedUser = await user.save();
    
    // Tạo token mới
    const token = generateToken(updatedUser._id);
    
    // Trả về thông tin đã cập nhật (không bao gồm mật khẩu)
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      address: updatedUser.address,
      image: updatedUser.image,
      token
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @route   GET /api/auth/users
// @desc    Lấy danh sách người dùng (chỉ admin)
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// @route   DELETE /api/auth/users/:id
// @desc    Xóa người dùng
// @access  Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    // Không cho phép xóa tài khoản admin gốc
    if (user.role === 'admin' && user.email === 'admin@example.com') {
      return res.status(400).json({ message: 'Không thể xóa tài khoản admin gốc' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Người dùng đã được xóa thành công' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa người dùng' });
  }
});

// Thay đổi vai trò người dùng
router.patch('/users/:id/role', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Không cho phép thay đổi vai trò của admin mặc định
    if (user.email === 'admin@example.com') {
      return res.status(403).json({ message: 'Không thể thay đổi vai trò của admin mặc định' });
    }

    user.role = user.role === 'admin' ? 'customer' : 'admin';
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error changing user role:', error);
    res.status(500).json({ message: 'Lỗi server khi thay đổi vai trò người dùng' });
  }
});

// Khóa/mở khóa tài khoản người dùng
router.patch('/users/:id/lock', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Không cho phép khóa tài khoản admin mặc định
    if (user.email === 'admin@example.com') {
      return res.status(403).json({ message: 'Không thể khóa tài khoản admin mặc định' });
    }

    user.isLocked = !user.isLocked;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error toggling user lock status:', error);
    res.status(500).json({ message: 'Lỗi server khi thay đổi trạng thái khóa tài khoản' });
  }
});
module.exports = router;