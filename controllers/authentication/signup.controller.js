const bcrypt = require("bcryptjs");
const db = require("../../models");
const sendSlackMessage = require("../send.slack.message");
const User = db.user;
const Role = db.role;
const generateUniqueUsername = require("./username.generate");
const config = require("../../config/auth.config");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  console.log(
    "----------------------------------------------------------------"
  );
  try {
    let generatedUsername = await generateUniqueUsername(req.body.name);
    // Keep generating a unique username until one is found
    while (!generatedUsername) {
      generatedUsername = await generateUniqueUsername(req.body.name);
    }
    console.log("Generated Username:", generatedUsername);
    const slackData = {
      token: process.env.slackBotToken,
      channel: "signup",
      text: `
            Name: ${req.body.name}
            Email: ${req.body.email}
            username: ${generatedUsername}
          `,
      //   text: `
      //   Name: ${req.body.name}
      //   Second Name: ${req.body.lastName}
      //   Email: ${req.body.email}
      //   Telefon: ${req.body.telephone}
      //   username: ${req.body.username}
      //   contactPersonId: ${req.body.contactPersonId}
      //   companyOrgNumber: ${req.body.companyOrgNumber}
      // `,
    };
    sendSlackMessage(req, res, slackData);
    // Save User to Database
    const newUser = await User.create({
      name: req.body.name,
      // lastName: req.body.lastName,
      // telephone: req.body.telephone,
      email: req.body.email,
      username: generatedUsername,
      password: bcrypt.hashSync(req.body.password, 8),
      // contactPersonId: req.body.contactPersonId,
      //  companyOrgNumber: req.body.companyOrgNumber,
    });
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: { name: { [Op.or]: req.body.roles } },
      });
      await newUser.setRoles(roles);
    } else {
      // user role = 5
      await newUser.setRoles([5]);
    }
    var token = jwt.sign({ id: newUser.id }, config.secret, {
      expiresIn: 464000, // 4 days in seconds
    });

    var authorities = [];
    newUser.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push(roles[i].name);
      }
      res.status(200).send({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        roles: authorities,
        accessToken: token,
        message: "User registered successfully!",
      });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ message: "Error registering user" });
  }
};
