const express = require("express");
const productRoutes = require("./routes/product.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

// Register Routes
app.use("/products", productRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Centralized error handling
app.use(errorMiddleware);

module.exports = app;
