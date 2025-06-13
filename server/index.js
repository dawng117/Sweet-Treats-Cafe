const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Đảm bảo dòng này ở đầu file
const connectDB = require('./config/db');

// Thêm dòng này để debug
console.log('Environment variables loaded:', {
  MONGO_URI: process.env.MONGO_URI ? 'Defined' : 'Undefined',
  JWT_SECRET: process.env.JWT_SECRET ? 'Defined' : 'Undefined',
  PORT: process.env.PORT
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Kích hoạt route auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Thêm route orders
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

// Thêm route blogs
const blogRoutes = require('./routes/blog');
app.use('/api/blogs', blogRoutes);

// Routes (sẽ thêm sau)
app.get('/', (req, res) => res.send('Sweet Treats Café API'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));