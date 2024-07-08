const puppeteer = require("puppeteer");
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
      ignoreDefaultArgs: ["--disable-extensions"],
    });

    const page = await browser.newPage();
    await page.goto(searchpage);

    while (!isNextDisabled) {
      const productHandles = await page.$$(
        "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
      );

      console.log(productHandles);

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

        if (
          title !== "Null" &&
          price !== "Null" &&
          image !== "Null" &&
          link !== "Null"
        ) {
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
    res.status(500).json(error);
  }
});

const reviewscraper = asyncHandler(async (req, res) => {
  const term = "owala";
  const productpage =
    "https://www.amazon.sg/Owala-FreeSip-Insulated-Stainless-BPA-Free/dp/B0BZYCJK89/ref=sr_1_2?dib=eyJ2IjoiMSJ9.RcV4SG2y5sdrUX4bgZNUKUJww2T31hDfWphiBLRIxl4_BtCGSi8HdctZJxiRZm3FhVvN8dEQtnhs8LRKSLCbwMXLMpfDDyzskLkzV0OkhJID5EA5ZgSgU0lPKxXvZ_b3UjAqR-mwng7zSNFfbNYz_09TGiBIc7W3yYHD6UpzgV6ihDGONbpI4D4RH8ep0JB5KdvloI_aaqRDo2YdA-kPysDFGOHSDe8eKaAwZuxQmzwqB_5cur4LnmGjB5hTujZbPcZhO6Y9NShrf9Q46GE-gk1KlY9-ZMO1_zHBlhqsaIw._laI6x3SUMjkOpZ0LzK8y5Z3w13OYORLjepqQzfZaD8&dib_tag=se&keywords=owala&qid=1720427114&sr=8-2&th=1";

  let result = [];
  let isNextDisabled = false;

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    userDataDir: "./tmp",
    ignoreDefaultArgs: ["--disable-extensions"],
  });

  const page = await browser.newPage();
  await page.goto(productpage);

  //if product page has "see more reviews"
  try {
    await page.waitForSelector(".a-link-emphasis.a-text-bold", {
      timeout: 3000,
    });
    await page.click(".a-link-emphasis.a-text-bold");
  } catch (error) {
    console.log(error);
  }

  await page.waitForSelector(".a-section.a-spacing-none.review-views");
  const reviewHandles = await page.$$(
    ".a-section.a-spacing-none.review-views > .a-section",
    {
      timeout: 3000,
    }
  );

  for (const i of reviewHandles) {
    let text = "Null";
    let rating = "Null";
    let name = "Null";

    try {
      text = await page.evaluate(
        (el) =>
          el.querySelector(".review-text-content > span").textContent.trim(),
        i
      );
    } catch (error) {}

    try {
      rating = await page.evaluate(
        (el) =>
          el
            .querySelector('i[data-hook="review-star-rating"]')
            .textContent.trim(),
        i
      );
    } catch (error) {
      console.log(error);
    }

    try {
      name = await page.evaluate(
        (el) => el.querySelector("span.a-profile-name").textContent.trim(),
        i
      );
    } catch (error) {
      console.log(error);
    }

    if (name !== "Null" && rating !== "Null" && text !== "Null") {
      result.push({ name: name, rating: rating, text: text });
    }
  }
  console.log(result);
  console.log("done");
});
module.exports = { webscraper, reviewscraper };
