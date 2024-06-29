const puppeteer = require("puppeteer");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

require("dotenv").config();

/*
    @desc scrapes amazon search page based on user defined search term
    @route POST /api/user/scrape
    @access Public
*/

const webscraper = asyncHandler(async (req, res) => {
  try {
    const { searchTerm } = req.body; // Destructure searchTerm from req.body
    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const searchpage = `https://www.amazon.sg/s?k=${encodeURIComponent(searchTerm)}`;
    let result = [];
    let isNextDisabled = false;

    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    await page.goto(searchpage);

    while (!isNextDisabled) {
      const productHandles = await page.$$(
        "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
      );

      for (const i of productHandles) {
        let title = "Null";
        let price = "Null";
        let image = "Null";
        let link = "Null";

        try {
          title = await page.evaluate(
            (el) => el.querySelector("h2 > a > span").textContent.trim(),
            i
          );
        } catch (error) {}

        try {
          price = await page.evaluate(
            (el) =>
              el.querySelector(".a-price > .a-offscreen").textContent.trim(),
            i
          );
        } catch (error) {}

        try {
          image = await page.evaluate(
            (el) => el.querySelector(".s-image").getAttribute("src"),
            i
          );
        } catch (error) {}

        try {
          link = await page.evaluate(
            (el) => el.querySelector("h2 > a").getAttribute("href"),
            i
          );
          link = `https://www.amazon.sg${link}`;
        } catch (error) {}

        if (title !== "Null" && price !== "Null" && link !== "Null") {
          result.push({ title: title, price: price, image: image, link: link });
        }
      }

      if (result.length > 5) {
        break;
      }

      try {
        await page.waitForSelector(".s-pagination-item.s-pagination-next", {
          visible: true,
        });
        let next_disabled =
          (await page.$(
            "span.s-pagination-item.s-pagination-next.s-pagination-disabled"
          )) !== null;
        isNextDisabled = next_disabled;

        if (!next_disabled) {
          await Promise.all([
            page.click(
              "a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"
            ),
            page.waitForNavigation({ waitUntil: "networkidle2" }),
          ]);
        }
      } catch (error) {
        isNextDisabled = true;
      }
    }

    await browser.close();
    res.json({ result });
  } catch (error) {
    console.error("Error in web scraping:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { webscraper };
