const db = require("../../models");
const crypto = require("crypto");
const Token = db.token;

module.exports = async (userId) => {
    // generate a random token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // save the token in the database
    await Token.create({
        userId: userId,
        token: resetToken
    });
    return resetToken;
}