const express = require("express");
const bodyParser = require("body-parser")
const connectDB = require("./db")
const User = require("./models/User")

const app = express()
connectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("./signup", async (req, res) => {
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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server is running")
});