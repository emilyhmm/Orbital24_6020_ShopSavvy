const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateRefreshToken, generateAccessToken } = require('../jwtToken');


/*
    @desc Login users
    @route POST /api/user/signup
    @access Public
*/
const createUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        let user = new User({
            email, password
        })

        const findUser = await User.findOne({email: email}); //as email is unique
        if (findUser) {res.status(400).json("User already exists")}

        await user.save()
        res.status(201).send("User registered successfully")
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
});

const createMerchant = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        let user = new User({
            email, password, role: "Merchant"
        })

        const findUser = await User.findOne({email: email}); //as email is unique
        if (findUser) {res.status(400).json("User already exists")}

        await user.save()
        res.status(201).send("User registered successfully")
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
});


/*
    @desc Login users
    @route POST /api/user/login
    @access Public
*/

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database with a case-insensitive email search
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        // If the user is not found, respond with an error
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password does not match, respond with an error
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Create secure cookie with refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'None', 
            maxAge: 30 * 24 * 60 * 60 * 1000 
        });

        // Send the access token in the response
        res.json({ accessToken });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});



const loginMerchant = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    try{
        const findAdmin = await User.findOne({ email });
        if (findAdmin.role !== "admin") throw new Error("Not Authorised");
        loginUser(req);

    } catch (error) {
        console.log(error);
        res.status(500).json("Server error");
    }
    
});

/*
    @desc handles logic of refresh tokens
    @route GET /api/user/refresh
    @access Public
*/
const refresh = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        return res.status(401).json({message : "Unauthorised"});
    }

    const refreshToken = cookies.refreshToken;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({message: "Forbidden"});
            }

            const foundUser = User.findOne({ email: decoded.email }).exec();
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

            const newAccessToken = generateAccessToken({foundUser});

            res.json({newAccessToken})
        }

    )
});

/*
    @desc handles logout which clears refresh token from user's cookies
    @route GET /api/user/logout
    @access Public
*/
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    })
    res.redirect('/login');

});




module.exports = { createUser, createMerchant, loginUser, refresh, logout, loginMerchant }

