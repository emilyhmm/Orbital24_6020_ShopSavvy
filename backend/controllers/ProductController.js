const Product = require("../models/productModel");
const puppeteer = require("puppeteer");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
    try {
        const { title, price } = req.body;

        if (!title || !price) {
            return res.status(400).json({ message: 'Title and price are required' });
        }

        if (isNaN(price) || price < 0) {
            return res.status(400).json({ message: 'Price must be a non-negative number' });
        }

        // Generate slug from title
        req.body.slug = slugify(title);

        // Create new product
        const newProduct = await Product.create(req.body);

        // Respond with the created product
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
});



const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract the id from req.params
    try {
        validateMongoDbId(id); // Validate the MongoDB ID
        const deletedProduct = await Product.findByIdAndDelete(id); // Use findByIdAndDelete
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDbId(id);
        
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true 
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
});

/*
    @desc scrapes amazon search page based on user defined search term
    @route POST /api/user/scrape
    @access Public
*/

const webscraper = asyncHandler(async (req, res) => {
    //can implement check that req is null?
    const { searchTerm } = req.body
    const searchpage = "https://www.amazon.sg/s?k=".concat(searchTerm);
    let result = [];
    let isNextDisabled = false;

    const browser = await puppeteer.launch({
        headless: false, //so that browser doesnt launch 
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
            } catch (error){}

            //filtering out null values
            if(title !== "Null" && price !== "Null" && link !== "Null") {
                result.push({"title": title, "price": price, "image": image, "link": link})
            }

        }

        if(result.length > 100) {
            break;
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

    await browser.close();
    res.json({result});
});



module.exports = { webscraper, createProduct, deleteProduct, updateProduct }