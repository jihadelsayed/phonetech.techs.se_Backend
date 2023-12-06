const bcrypt = require("bcryptjs");
const db = require("../../models");
const User = db.user;
const Token = db.token;

module.exports = async (req, res, next) => {
  // check if the token is valid
  const token = await Token.findOne({
    where: { token: req.body.token }
  });
  if (!token) {
    return res.status(404).send({ message: 'Invalid token' });
  }
  // check if the token is expired
  if (token.createdAt < Date.now() - 3600000) {
    return res.status(400).send({ message: 'Token expired' });
  }
  // find the user associated with the token
  const user = await User.findOne({
    where: { id: token.userId }
  });
  if (!user) {
    return res.status(404).send({ message: 'Användaren hittades inte' });
  }
  // update the user's password
  user.password = bcrypt.hashSync(req.body.password, 8);
  await user.save();
  // delete the token from the database
  await token.destroy();
  res.status(200).send({ message: 'Password reset successfully' });
};