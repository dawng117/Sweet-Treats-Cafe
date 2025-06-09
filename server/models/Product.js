const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, enum: ['Bánh', 'Cafe & Đồ uống', 'Đồ ngọt'], required: true },
  image: String,
  inStock: { type: Boolean, default: true },
  
});

module.exports = mongoose.model('Product', productSchema);