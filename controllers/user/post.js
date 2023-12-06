const express = require("express");

const user = require("../../models/user");
const db = require("../../models");
const category = db.category;
const { ingestUser } = require("../../database/sonic/ingest");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res, next) => {
  req.body.price = req.body.price.toFixed(2);

  try {
    if (req.body.discount_datetime_start)
      req.body.discount_datetime_start = new Date(
        req.body.discount_datetime_start
      );
    if (req.body.discount_datetime_end)
      req.body.discount_datetime_end = new Date(req.body.discount_datetime_end);

    const category = await category.findByPk(req.body.category_id);

    if (!category)
      return res.status(400).send({ message: "category not found" });

    const user = await user.create(req.body);

    await ingestUser(user.id, user.title);

    return res.json(user);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
