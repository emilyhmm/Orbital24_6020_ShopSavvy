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

      for (const i of productHandles) {
        let title = "Null";
        let price = "Null";
        let image = "Null";
        let link = "Null";
        let rating = "0";
        let sold = "0";

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

        try {
          rating = await page.evaluate(
            (el) => el.querySelector(".a-icon-alt").textContent.trim(),
            i
          );
          rating = rating.slice(0, 3);
        } catch (error) {}

        try {
          sold = await page.evaluate(
            (el) =>
              el
                .querySelector(".a-size-base.s-underline-text")
                .textContent.trim(),
            i
          );
        } catch (error) {}

        if (
          title !== "Null" &&
          price !== "Null" &&
          image !== "Null" &&
          link !== "Null" &&
          rating !== "Null" &&
          sold !== "Null"
        ) {
          result.push({
            title: title,
            price: price,
            image: image,
            link: link,
            rating: rating,
            sold: sold,
          });
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
    console.log(result);
    await browser.close();
    res.json({ result });
  } catch (error) {
    console.error("Error in web scraping:", error);
    res.status(500).json(error);
  }
});

const reviewscraper = asyncHandler(async (req, res) => {
  const productpage = req.body.productlink;
  console.log(productpage);
  let result = [];

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
      timeout: 10000,
    });
    await page.click(".a-link-emphasis.a-text-bold");
  } catch (error) {
    res.json({ result });
    await browser.close();
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
      if (text.length > 280) {
        text = "Null";
      }
    } catch (error) {}

    try {
      rating = await page.evaluate(
        (el) =>
          el
            .querySelector(".review-rating> span.a-icon-alt")
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
  await browser.close();
  console.log(result);
  res.json({ result });
  console.log("done");
});
module.exports = { webscraper, reviewscraper };
