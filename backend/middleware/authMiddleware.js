const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && req.headers.authorization.split(" ")[1];
    
    if (token == null) {
        return res.status(500).json("No token") //unexpected error
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403) //forbidden
        } 
        req.user = user;
        console.log(user)
        next();
    })
});