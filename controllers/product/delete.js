// const express = require("express");

const db = require("../../models");
const product = db.product;
// const { flushProduct } = require("../../database/sonic/flushObject");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await product.destroy({ where: { id } });

    if (product == 0)
      return res.status(400).send({ message: "product not found" });

    await flushProduct(id);

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
