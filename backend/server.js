const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");

const cors = require("cors");

const connectDB = require("./db")
connectDB()

const app = express()
app.use(cors())

//body parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server is running on port',PORT)
});