const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review schema
const reviewSchema = new Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true }
});

// FAQ schema
const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

// Image schema
const imageSchema = new Schema({
  url: { type: String, required: true },
  type: { type: String, required: true },
  alt: { type: String, required: true }
});

// Related product schema
const relatedProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, required: true }
});

// Main product schema
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  details: {
    size: { type: String, required: true },
    unit: { type: String, required: true },
    color: { type: String, required: true },
    weight: { type: String, required: true },
    dimensions: { type: String, required: true },
    material: { type: String, required: true }
  },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  location: { type: String, required: true },
  area_pincode: { type: String, required: true },
  promo_code: { type: String, required: true },
  vendor_code: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [imageSchema],
  specifications: {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    weight: { type: String, required: true },
    dimensions: { type: String, required: true },
    material: { type: String, required: true },
    features: [{ type: String }],
    certifications: [{ type: String }],
    compatibility: [{ type: String }]
  },
  additional_info: {
    warranty: { type: String, required: true },
    included_accessories: [{ type: String, required: true }],
    shipping_info: {
      weight: { type: String, required: true },
      dimensions: { type: String, required: true },
      method: { type: String, required: true },
      estimated_delivery: { type: String, required: true },
      shipping_cost: { type: Number, required: true },
      international_shipping: { type: Boolean, required: true }
    },
    return_policy: { type: String, required: true },
    customer_support: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      hours: { type: String, required: true },
      live_chat: { type: Boolean, required: true }
    },
    manual_url: { type: String, required: true },
    video_tutorial_url: { type: String, required: true },
    battery_life: { type: String, required: true },
    compatible_software: { type: String, required: true }
  },
  reviews: [reviewSchema],
  faq: [faqSchema],
  related_products: [relatedProductSchema],
  tags: [{ type: String }]
});

module.exports = productSchema;
