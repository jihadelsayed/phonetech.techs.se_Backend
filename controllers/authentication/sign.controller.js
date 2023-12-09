const db = require("../../models");
const config = require("../../config/auth.config");
const User = db.user;
const Role = db.role;
const { Op } = require("sequelize");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  console.log("---------------------------------");
  console.log(req.body);
  User.findOne({
    where: {
      [Op.or]: [
        { email: req.body.email },
        { telephone: req.body.email },
        { username: req.body.email },
      ],
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 464000, // 4 days in seconds
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name);
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
