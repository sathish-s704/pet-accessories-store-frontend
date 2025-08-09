import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, actualPrice, discount, category, totalStock, inStock } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const productData = {
      name,
      description,
      price,
      actualPrice,
      discount: discount || 0,
      category,
      totalStock: totalStock || 0,
      inStock: inStock === 'true' || inStock === true || inStock !== false,
      imageUrl
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: err.message });
  }
};
   
// Get All Products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get Single Product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, actualPrice, discount, category, totalStock, inStock } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    // Build update object with all fields
    const updateData = {
      name,
      description,
      price,
      actualPrice,
      discount: discount || 0,
      category,
      totalStock: totalStock || 0,
      inStock: inStock === 'true' || inStock === true, // Handle string/boolean conversion
      ...(imageUrl && { imageUrl })
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
};
