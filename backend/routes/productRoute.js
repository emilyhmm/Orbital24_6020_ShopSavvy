const express = require("express");
const { webscraper } = require("../controllers/ProductController");

const router = express.Router();

router.post("/scrape", webscraper);

module.exports = router;
