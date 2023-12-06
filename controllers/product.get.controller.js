const { order, user } = require('../models');
const db = require("../models");
const order = db.order;
const Product = db.product;

exports.getProducts = async (req, res) => {

  const Products = await Product.findAll({ where: { order: req.params.orderId }});
  // console.log(JSON.stringify(orders, null, 2));
  res.status(200).send({
    message: "UnderDevelopment Products!", 
    list: JSON.stringify(Products, null, 2),
    userId: req.userId,
    orderId: req.params.orderId
  });
};
