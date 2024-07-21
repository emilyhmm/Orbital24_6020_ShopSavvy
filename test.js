const { isDisabled } = require("@testing-library/user-event/dist/utils");
const puppeteer = require("puppeteer");

(async () => {
  const term = "owala";
  const productpage =
    "https://www.amazon.com/Acer-A115-32-C96U-Processor-Microsoft-Subscription/dp/B0BL35XNF5?th=1";
  let result = [];
  let isNextDisabled = false;

  const browser = await puppeteer.launch({
    headless: false,
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
})();
