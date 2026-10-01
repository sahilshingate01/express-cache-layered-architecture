const productService = require("../services/product.service");

const getAllProducts = async (req, res, next) => {
  try {
    const products = productService.getAllProducts();
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;

    // Basic Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid product data: name is required and must be a string" });
    }
    if (price === undefined || typeof price !== "number" || price <= 0) {
      return res.status(400).json({ success: false, message: "Invalid product data: price must be a positive number" });
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid product data: category is required and must be a string" });
    }

    const newProduct = productService.createProduct({ name, price, category });
    
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, price, category } = req.body;

    // Validation for PUT (all fields required)
    if (!name || typeof name !== "string" || name.trim() === "" || 
        price === undefined || typeof price !== "number" || price <= 0 || 
        !category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid product data: all fields required for PUT" });
    }

    const updatedProduct = productService.updateProduct(id, { name, price, category });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const patchProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "Invalid product data: at least one field is required" });
    }

    // Optional field validation
    if (updates.name !== undefined && (typeof updates.name !== "string" || updates.name.trim() === "")) {
      return res.status(400).json({ success: false, message: "Invalid product data: name must be a non-empty string" });
    }
    if (updates.price !== undefined && (typeof updates.price !== "number" || updates.price <= 0)) {
      return res.status(400).json({ success: false, message: "Invalid product data: price must be a positive number" });
    }
    if (updates.category !== undefined && (typeof updates.category !== "string" || updates.category.trim() === "")) {
      return res.status(400).json({ success: false, message: "Invalid product data: category must be a non-empty string" });
    }

    const patchedProduct = productService.patchProduct(id, updates);

    if (!patchedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      data: patchedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = productService.deleteProduct(id);

    if (!success) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
