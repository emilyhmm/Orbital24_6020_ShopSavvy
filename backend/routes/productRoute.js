const express = require("express");
const {
  webscraper,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/ProductController");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");

router.post("/scrape", webscraper);

module.exports = router;
