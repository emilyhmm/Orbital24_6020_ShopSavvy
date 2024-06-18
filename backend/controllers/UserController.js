const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
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
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //check if user exists and password matches
    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
        res.json({
            _id: user?._id,
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            mobile: user?.mobile,
            token: accessToken,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Server error");
    }


});


module.exports = { createUser, loginUser}

