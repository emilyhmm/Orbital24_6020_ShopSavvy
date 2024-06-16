const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

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
    const findUser = await User.findOne({email});
    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if(findUser && passwordMatch){
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
          });
    } else {
        return res.status(400).json({ error: 'Authentication failed' });
    }
});


module.exports = { createUser, loginUser}

