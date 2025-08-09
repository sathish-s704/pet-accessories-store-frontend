import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  actualPrice: { type: Number }, // Original price before discount
  discount: { type: Number, default: 0 }, // Discount percentage
  price: { type: Number, required: true }, // Final price after discount
  category: String,
  totalStock: { type: Number, default: 0 }, // Total quantity in stock
  imageUrl: String, // file path
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
