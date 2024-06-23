const express = require('express');
const { webscraper, createProduct, deleteProduct, updateProduct } = require('../controllers/ProductController');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");

router.post("/scrape", webscraper);
router.post("/", authMiddleware, isAdmin, createProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

module.exports = router;