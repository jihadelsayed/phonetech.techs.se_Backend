const express = require("express");

const user = require("../../models/user");
const AddressModel = require("../../models/AddressModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.tokenPayload.id;

  try {
    const user = await user.findByPk(user_id, {
      include: {
        association: "addresses",
        where: { id },
        required: false,
      },
    });

    if (!user) return res.status(400).send({ message: "user not found" });
    if (user.addresses.length < 1)
      return res.status(400).send({ message: "address not found" });

    AddressModel.destroy({ where: { id } });

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    res.status(500).send({ message: "internal error" });
  }
};
