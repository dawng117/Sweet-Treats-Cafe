const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const { protect, admin } = require('../middleware/authMiddleware');
const MomoService = require('../services/momoService');

// Get all orders (admin only)
router.get('/all', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'username')
      .populate('items.productId', 'name image price') // Thêm dòng này để lấy thông tin sản phẩm
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, total, address, phone, paymentMethod } = req.body;
    
    // Create new order
    const order = new Order({
      userId,
      items,
      total,
      address,
      phone,
      paymentMethod,
      status: 'pending',
      paymentStatus: paymentMethod === 'MoMo' ? 'pending' : 'paid'
    });

    // If payment method is MoMo, create MoMo payment
    if (paymentMethod === 'MoMo') {
      try {
        const momoResponse = await MomoService.createPayment(order);
        await order.save();
        res.json({
          orderId: order._id,
          payUrl: momoResponse.payUrl
        });
      } catch (error) {
        console.error('MoMo payment error:', error);
        res.status(400).json({ message: 'Lỗi khi tạo thanh toán MoMo' });
      }
    } else {
      // For COD, just save the order
      await order.save();
      res.json(order);
    }
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add MoMo IPN (Instant Payment Notification) handler
router.post('/momo-notify', async (req, res) => {
  try {
    const { orderId, resultCode, message, transId } = req.body;
    console.log('MoMo IPN:', req.body);

    // Tìm order bằng cả _id và status pending
    const order = await Order.findOne({
      _id: orderId,
      status: 'pending',
      paymentStatus: 'pending'
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or already processed' });
    }

    if (resultCode === 0) {
      // Payment successful
      order.status = 'pending';
      order.paymentStatus = 'paid';
      order.transactionId = transId;
      await order.save();
      res.json({ message: 'OK' });
    } else {
      // Payment failed or cancelled - delete the order and return success
      await Order.findByIdAndDelete(orderId);
      res.json({ message: 'Payment failed, order deleted' });
    }
  } catch (error) {
    console.error('MoMo IPN error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a specific order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the order belongs to the authenticated user
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this order' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (admin only)
router.patch('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'processing', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Không cần kiểm tra role ở đây nữa vì middleware admin đã làm việc đó
    
    order.status = status;
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;