const Product = require("../models/productModell");
const User = require("../models/userModel");
const pupeteer = require("puppeteer");

const search = asyncHandler(async (req, res) => {
    //can implement check that req is null?
    const term = req.body;
    const searchpage = "https://www.amazon.sg/s?k=".concat(term);
    let result = [];
    console.log(searchpage);

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false, 
        userDataDir: "./tmp",
    });
        
    const page = await browser.newPage();
    await page.goto(searchpage);

    //finds elements on page that match selector
    const productHandles = await page.$$(
        "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
    ); 

    //looping through every element to extract out product title, price and image
    for (const i of productHandles) {

        let title = "Null";
        let price = "Null";
        let image = "Null";

        try {
            title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, i);
        } catch (error){}

        try {
            price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, i);
        } catch (error){}

        try {
            image = await page.evaluate(el => el.querySelector(".s-image").getAttribute("src"), i);
        } catch (error){}

        //filtering out null values
        if(title !== "Null") {
            result.push({"title": title, "price": price, "image": image})
        }
    }

    console.log(result);
});