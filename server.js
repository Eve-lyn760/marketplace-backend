require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());
const authRoutes = require("./src/routes/auth.routes");
app.use("/api/auth", authRoutes);

const productRoutes = require("./src/routes/product.routes");
app.use("/api/products", productRoutes);

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Backend Marketplace API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

