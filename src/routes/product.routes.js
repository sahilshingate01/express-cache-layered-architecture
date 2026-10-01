const express = require("express");
const productController = require("../controllers/product.controller");
const cacheMiddleware = require("../middleware/cache.middleware");

const router = express.Router();

// GET all products with caching
router.get(
  "/",
  cacheMiddleware("products:all"),
  productController.getAllProducts
);

// GET a product by ID with caching
router.get(
  "/:id",
  cacheMiddleware((req) => `products:${req.params.id}`),
  productController.getProductById
);

// POST create a product
router.post("/", productController.createProduct);

// PUT complete replacement of a product
router.put("/:id", productController.updateProduct);

// PATCH partial update of a product
router.patch("/:id", productController.patchProduct);

// DELETE a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
