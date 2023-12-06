const db = require("../models");
const User = db.user;

module.exports = async (req, res, next) => {
    // check if user with the same username or email exists in the database
    const userWithUsername = await User.findOne({
        where: {username: req.body.username}
    });
    if (userWithUsername) {
        return res.status(400).send({
            message: "Failed! Username is already in use!"
        });
    }
    const userWithEmail = await User.findOne({
        where: {email: req.body.email}
    });
    if (userWithEmail) {
        return res.status(400).send({
            message: "Failed! Email is already in use!"
        });
    }
    next();
}
