const jwt = require('jsonwebtoken')

const generateToken = (res, userID) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.ENV !== "dev",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    })
}

module.exports = generateToken