const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
// ["isSuperUser", "isAdmin", "isInstaller","isEmployee", "isCompany", "isPrivateCustomer"]

isSuperUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superuser") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Super User Role!"
      });
      return;
    });
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin" || roles[i].name === "superuser") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};
isInstaller = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "installer" || roles[i].name === "admin" || roles[i].name === "superuser") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Installer Role!"
      });
      return;
    });
  });
};
isEmployee = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "employee" || roles[i].name === "installer" || roles[i].name === "admin" || roles[i].name === "superuser") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Employee Role!"
      });
      return;
    });
  });
};
isCompany = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "company" ||
        roles[i].name === "employee" || roles[i].name === "installer" || roles[i].name === "admin" || roles[i].name === "superuser") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Company Role!"
      });
      return;
    });
  });
};
isPrivateCustomer = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "privateCustomer" || roles[i].name === "company" ||
        roles[i].name === "employee" || roles[i].name === "installer" || roles[i].name === "admin" || roles[i].name === "superuser") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Private Customer Role!"
      });
      return;
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isSuperUser: isSuperUser,
  isAdmin: isAdmin,
  isInstaller: isInstaller,
  isEmployee: isEmployee,
  isCompany: isCompany,
  isPrivateCustomer: isPrivateCustomer,
};
module.exports = authJwt;
