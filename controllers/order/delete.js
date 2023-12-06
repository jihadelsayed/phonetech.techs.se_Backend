const express = require("express");

const db = require("../../models");
const orderModule = db.order ;

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const order = await orderModule.destroy({ where: { id } });

    if (order == null)
      return res.status(400).send({ message: "Buy order not found" });
    return res.json(order);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "Error searching order" });
  }
};