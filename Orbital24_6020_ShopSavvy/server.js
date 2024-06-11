const express = require("express");
const bodyParser = require("body-parser")
const connectDB = require("./db")
const User = require("./models/User")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const app = express()
app.use(cors())
connectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/signup", async (req, res) => {
    const { email, password } = req.body
    try {
        let user = new User({
            email, password
        })
        await user.save()
        res.status(201).send("User registered successfully")
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server is running on port',PORT)
});

