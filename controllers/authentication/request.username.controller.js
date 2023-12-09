const db = require("../../models");
const User = db.user;
const tokenGenerate = require("./token.generate");
const sendUsernameEmail = require("./send.username.email");

module.exports = async (req, res, next) => {
  // check if the user exists
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return res.status(404).send({ message: "Användaren hittades inte" });
  }
  const resetToken = await tokenGenerate(user.id);
  sendUsernameEmail(req, res, user.email, user.username, user.name);
};
