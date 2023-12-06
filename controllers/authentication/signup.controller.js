const bcrypt = require("bcryptjs");
const db = require("../../models");
const sendSlackMessage = require("../send.slack.message");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

module.exports = async (req, res, next) => {
  const slackData = {
    token: process.env.slackBotToken,
    channel: "signup",
    text: `
          First Name: ${req.body.firstName}
          Second Name: ${req.body.lastName}
          Email: ${req.body.email}
          Telefon: ${req.body.telephone}
          username: ${req.body.username}
          contactPersonId: ${req.body.contactPersonId}
          companyOrgNumber: ${req.body.companyOrgNumber}
        `,
  };
  sendSlackMessage(req, res, slackData);
  // Save User to Database
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    contactPersonId: req.body.contactPersonId,
    companyOrgNumber: req.body.companyOrgNumber,
  });
  if (req.body.roles) {
    const roles = await Role.findAll({
      where: { name: { [Op.or]: req.body.roles } },
    });
    await newUser.setRoles(roles);
  } else {
    // user role = 1
    await newUser.setRoles([1]);
  }
  res.send({ message: "User registered successfully!" });
};
