require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db"); // pastikan ini file koneksi MongoDB

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // supaya bisa diakses dari frontend
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/products", require("./src/routes/product.routes"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend Marketplace API is running");
});

// Gunakan PORT dari environment (Fly.io menentukan PORT sendiri)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
