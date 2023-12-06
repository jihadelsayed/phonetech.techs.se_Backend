const db = require("../models");
const ROLES = db.ROLES;
const order = db.order;

checkDuplicateOrder = (req, res, next) => {
  // order

  order.findOne({
    where: {
      serialNumber: req.body.serialNumber
    }
  }).then(order => {
    if (order) {
      console.log("fun")

      res.status(400).send({
        message: "Failed! order has already been added!"
      });
      return;
    }
    console.log("fun")

    next();
  });
};
checkDuplicateProduct = (req, res, next) => {
  // order

  order.findOne({
    where: {
      serialNumber: req.body.serialNumber
    }
  }).then(order => {
    if (order) {
      console.log("fun")

      res.status(400).send({
        message: "Failed! order has already been added!"
      });
      return;
    }
    console.log("fun")

    next();
  });
};

const verifyOrder = {
  checkDuplicateOrder: checkDuplicateOrder,
  checkDuplicateProduct: checkDuplicateProduct,
//checkRolesExisted: checkRolesExisted
};

module.exports = verifyOrder;
