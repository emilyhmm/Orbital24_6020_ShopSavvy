const { isDisabled } = require("@testing-library/user-event/dist/utils");
const puppeteer = require("puppeteer");

(async () => {
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
})();
