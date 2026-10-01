const database = require("../database/product.database");
const cacheService = require("./cache.service");

const getAllProducts = () => {
  return database.findAll();
};

const getProductById = (id) => {
  return database.findById(id);
};

const createProduct = (data) => {
  const newProduct = database.insert(data);
  // Clear cache after successful mutation
  cacheService.clear();
  return newProduct;
};

const updateProduct = (id, data) => {
  const updatedProduct = database.update(id, data);
  if (updatedProduct) {
    // Clear cache after successful mutation
    cacheService.clear();
  }
  return updatedProduct;
};

const patchProduct = (id, data) => {
  const patchedProduct = database.patch(id, data);
  if (patchedProduct) {
    // Clear cache after successful mutation
    cacheService.clear();
  }
  return patchedProduct;
};

const deleteProduct = (id) => {
  const success = database.remove(id);
  if (success) {
    // Clear cache after successful mutation
    cacheService.clear();
  }
  return success;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
