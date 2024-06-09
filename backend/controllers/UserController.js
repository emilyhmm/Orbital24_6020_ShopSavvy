const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email; 
    const findUser = await User.findOne({email: email}); //as email is unique
    if(!findUser) {
        //creates a new user
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
    } else {
        // User already exist
        res.status(400).json({
            msg: "User Already Exists",
            success : false,
        });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({email: email}); //as email is unique
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