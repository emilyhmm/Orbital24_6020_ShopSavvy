const pupeteer = require("puppeteer");

const term = req.body;
const searchpage = "https://www.amazon.sg/s?k=".concat(term);
let result = {};
console.log(searchpage);

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false, 
    userDataDir: "./tmp",
});
    
const page = await browser.newPage();
await page.goto(searchpage);
    
const productsHandles = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
);

