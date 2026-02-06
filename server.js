require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/products", require("./src/routes/product.routes"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend Marketplace API is running");
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

