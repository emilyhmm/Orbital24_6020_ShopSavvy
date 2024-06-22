const express = require('express');
const { webscraper, createProduct } = require('../controllers/ProductController');
const router = express.Router();

router.post("/scrape", webscraper);
router.post("/", authMiddleware, isAdmin, createProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

module.exports = router;