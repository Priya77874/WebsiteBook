// This file represents the structure for the Node.js backend integration
// It is not executed in the browser demo but serves as the requested output.

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: String,
  category: { type: String, enum: ['Novels', 'Motivational', 'Spiritual', 'NCERT', 'Competitive', 'Stationery'] },
  price: Number,
  discount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  image: String,
  description: String,
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  user: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['COD', 'Online'] },
  paymentStatus: { type: String, default: 'Pending' },
  rewardsApplied: String
}, { timestamps: true });

const settingsSchema = new mongoose.Schema({
  morningDiscount: { start: Number, end: Number, percent: Number },
  eveningDiscount: { start: Number, end: Number, percent: Number },
  isSundayWheelEnabled: Boolean,
  socialLinks: {
    instagram: String,
    facebook: String,
    twitter: String
  }
});

module.exports = {
  Product: mongoose.model('Product', productSchema),
  Order: mongoose.model('Order', orderSchema),
  Settings: mongoose.model('Settings', settingsSchema)
};
