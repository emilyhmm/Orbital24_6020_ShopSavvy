const { isDisabled } = require("@testing-library/user-event/dist/utils");
const puppeteer = require("puppeteer");

(async () => {
  try {
    const searchTerm = "owala"; // Destructure searchTerm from req.body
    if (!searchTerm) {
    }

    const searchpage = `https://shopee.sg/search?keyword=${encodeURIComponent(searchTerm)}`;
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
      await page.waitForSelector("ul.shopee-search-item-result__items", {
        timeout: 30000,
      });
      const productHandles = await page.$$("shopee-search-item-result__items");
      console.log(productHandles);
      for (const i of productHandles) {
        let title = "Null";
        let price = "Null";
        let image = "Null";
        let link = "Null";

        try {
          title = await page.evaluate(
            (el) => el.querySelector("whitespace-normal").textContent.trim(),
            i
          );
        } catch (error) {}
      }
    }

    await browser.close();
  } catch (error) {
    console.error("Error in web scraping:", error);
  }
})();
