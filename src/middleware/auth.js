const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    if (!req.cookies.token) {
        return res.redirect("/users/login");
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) {
        // return res.send({ error: "Please Login First" });
        throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
}

module.exports = auth;