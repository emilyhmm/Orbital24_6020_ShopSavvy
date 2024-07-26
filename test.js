const { isDisabled } = require("@testing-library/user-event/dist/utils");
const puppeteer = require("puppeteer");

(async () => {
  try {
    const searchTerm = "owala"; // Destructure searchTerm from req.body
    if (!searchTerm) {
    }

    const searchpage = `https://www.amazon.sg/s?k=${encodeURIComponent(searchTerm)}`;
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
          link !== "Null"
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
  } catch (error) {
    console.error("Error in web scraping:", error);
  }
})();
