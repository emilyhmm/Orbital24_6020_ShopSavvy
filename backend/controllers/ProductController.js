const Product = require("../models/productModell");
const puppeteer = require("puppeteer");
const asyncHandler = require("express-async-handler");

const webscrapper = asyncHandler(async (req, res) => {
    //can implement check that req is null?
    const term = req.body;
    const searchpage = "https://www.amazon.sg/s?k=".concat(term);
    let result = [];
    let isNextDisabled = false;

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false, 
        userDataDir: "./tmp",
    });
        
    const page = await browser.newPage();
    await page.goto(searchpage);

    while(!isNextDisabled) {
        //finds elements on page that match selector
        const productHandles = await page.$$(
            "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
        ); 

        //looping through every element to extract out product title, price and image, and product link
        for (const i of productHandles) {

            let title = "Null";
            let price = "Null";
            let image = "Null";
            let link = "Null"

            try {
                title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, i);
            } catch (error){}

            try {
                price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, i);
            } catch (error){}

            try {
                image = await page.evaluate(el => el.querySelector(".s-image").getAttribute("src"), i);
            } catch (error){}
            
            try {
                link = await page.evaluate(el => el.querySelector("h2 > a").getAttribute("href"), i);
                link = `https://www.amazon.sg${link}`; //to construct the full link
            } catch (error){ 
                console.log(error);
            }

            //filtering out null values
            if(title !== "Null" && price !== "Null") {
                result.push({"title": title, "price": price, "image": image, "link": link})
            }

        }
        
        //goes to the next page if there is one
        try {
            await page.waitForSelector('.s-pagination-item.s-pagination-next', { visible: true });
            let next_disabled = await page.$('span.s-pagination-item.s-pagination-next.s-pagination-disabled') !== null;
            isNextDisabled = next_disabled;

            if (!next_disabled) {
                await Promise.all([
                    page.click('a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator'),
                    page.waitForNavigation({ waitUntil: 'networkidle2' })
                ]);
            }
        } catch (error) {
            isNextDisabled = true;
        }
    }
    console.log(result); 
});