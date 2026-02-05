const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

/*
GET semua produk (buyer & seller)
*/
router.get("/", getProducts);

/*
POST tambah produk (SELLER ONLY)
*/
router.post("/", authMiddleware, createProduct);

/*
PUT update produk (SELLER ONLY)
*/
router.put("/:id", authMiddleware, updateProduct);

/*
DELETE hapus produk (SELLER ONLY)
*/
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
