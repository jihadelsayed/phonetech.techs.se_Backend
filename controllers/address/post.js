const express = require("express");

const user = require("../../models/user");
const AddressModel = require("../../models/AddressModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res, next) => {
  const user_id = req.tokenPayload.id;

  try {
    const user = await user.findByPk(user_id);

    if (!user) return res.status(400).send({ message: "user not found" });

    const address = await AddressModel.create({ user_id, ...req.body });

    return res.json(address);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    res.status(500).send({ message: "internal error" });
  }
};
