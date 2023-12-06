const { order, user } = require('../models');
const db = require("../models");
const order = db.order;

exports.getorders = async (req, res) => {

  const orders = await order.findAll({ where: { owner: req.userId }});
  console.log(JSON.stringify(orders, null, 2));
  res.status(200).send({
    message: "order with id: " + req.body.serialNumber + " for the user: " + req.userId + " has been registerd!", list: JSON.stringify(orders, null, 2),
    userId: req.userId, serialNumber: req.body.serialNumber
  });
};
