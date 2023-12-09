const db = require("../../models");
const User = db.user;
const tokenGenerate = require("./token.generate");
const sendResetEmail = require("./send.reset.email");

module.exports = async (req, res, next) => {
  // check if the user exists
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return res.status(404).send({ message: "Användaren hittades inte" });
  }

  const resetToken = await tokenGenerate(user.id);

  sendResetEmail(req, res, user.email, resetToken);
};
