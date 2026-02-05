const Product = require("../models/Product");

// GET semua produk
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE produk (seller only)
exports.createProduct = async (req, res) => {
  const { name, description, quantity } = req.body;

  if (!name || !description || quantity < 0) {
    return res.status(400).json({ message: "Data produk tidak valid" });
  }

  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Hanya seller yang bisa menambah produk" });
  }

  try {
    const product = await Product.create({
      name,
      description,
      quantity,
      seller: req.user.username
    });

    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE produk
exports.updateProduct = async (req, res) => {
  const { name, description, quantity } = req.body;

  if (!name || !description || quantity < 0) {
    return res.status(400).json({ message: "Data produk tidak valid" });
  }

  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Hanya seller yang bisa mengubah produk" });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, quantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json({
      message: "Produk berhasil diperbarui",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE produk
exports.deleteProduct = async (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Hanya seller yang bisa menghapus produk" });
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
