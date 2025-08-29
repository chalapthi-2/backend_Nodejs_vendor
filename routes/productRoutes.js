
const productController = require("../controllers/productController");
const express = require("express");
const path = require("path");

const router = express.Router();

// Add product to a firm
router.post("/add-product/:firmId", productController.addProduct);

// Get all products by firm
router.get("/:firmId/products", productController.getProductByFirm);

// Serve uploaded images (optional if using express.static in server.js)
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

// Delete product by ID
router.delete("/:productId", productController.deleteProductById);

module.exports = router;
