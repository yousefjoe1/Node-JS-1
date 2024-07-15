const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true, // Remove leading/trailing whitespace
    },
    price: {
      type: Number,
      required: true,
      min: 0.01, // Enforce minimum price (optional)
    },
    in_card: {
      type: Boolean,
      default: false, // Default to false if not explicitly set
    },
    image: {
      type: String, // Store image URL (consider using cloud storage for efficiency)
      // Or:
      // type: Buffer, // Store image data as binary (less common)
    },
  });

module.exports = mongoose.model('Products',productSchema)