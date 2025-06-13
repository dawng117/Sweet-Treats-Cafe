const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect, admin } = require('../middleware/authMiddleware');

// Lấy tất cả bài viết
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'username image')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy bài viết theo ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username image');
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo bài viết mới (chỉ admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const { title, content, category, image, tags } = req.body;
    const blog = new Blog({
      title,
      content,
      category,
      image,
      tags,
      author: req.user._id
    });
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật bài viết (chỉ admin)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { title, content, category, image, tags } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (blog) {
      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.category = category || blog.category;
      blog.image = image || blog.image;
      blog.tags = tags || blog.tags;
      blog.updatedAt = Date.now();
      
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa bài viết (chỉ admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await Blog.deleteOne({ _id: req.params.id });
      res.json({ message: 'Đã xóa bài viết' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;