const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const cookieParser = require("cookie-parser");

const app = express();

const connectDB = require("./db");
connectDB();

const whitelist = ["https://shoppysavvy.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser());

//body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
