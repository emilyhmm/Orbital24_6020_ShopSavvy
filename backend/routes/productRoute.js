const express = require("express");
const {
  webscraper,
  reviewscraper,
} = require("../controllers/ProductController");
const router = express.Router();

router.post("/scrape", webscraper);
router.post("/review", reviewscraper);

module.exports = router;
