const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateRefreshToken, generateAccessToken } = require("../jwtToken");

/*
    @desc Login users
    @route POST /api/user/signup
    @access Public
*/
const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // Check if the user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    // Create new user
    let user = new User({ firstname, lastname, email, password });
    // Save the new user to the database
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
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
    const finduser = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });
    // If the user is not found, respond with an error
    // Check if the user exists in the database
    if (!finduser) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, finduser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(finduser);
    const refreshToken = generateRefreshToken(finduser);

    // Create secure cookie with refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https if true. make it false to test on local host
      sameSite: "None", //cross-site cookie
      maxAge: 30 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Only redirect to quiz page if user has not done the quiz before
    const showQuiz = !finduser.completedQuiz;
    res.json({ accessToken, showQuiz });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

/*
    @desc handles logic of refresh tokens
    @route GET /api/user/refresh
    @access Public
*/
const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    User.findOne({ email: decoded.email }).exec((err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    });
  });
});

/*
    @desc handles logout which clears refresh token from user's cookies
    @route GET /api/user/logout
    @access Public
*/
const logout = asyncHandler(async (req, res) => {
  try {
    console.log("here");
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
});

const profile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.user._id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user); // Return user details including first name
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const editName = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.user._id;
    const { firstname, lastname } = req.body;
    const user = await User.findById(userId)
    if (user) {
      user.firstname = firstname;
      user.lastname = lastname;
      const updatedUser = await user.save();
  
      res.json({
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const editPassword = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.user._id;
    const { currentpassword, newpassword } = req.body;
    const user = await User.findById(userId)

    const isMatch = await bcrypt.compare(currentpassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }
    if (user) {
      user.password = newpassword;
      const updatedUser = await user.save();
  
      res.json({
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = { createUser, loginUser, refresh, logout, profile, editName, editPassword };
