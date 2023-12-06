const express = require("express");

const user = require("../../models/user");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res, next) => {
  const { id } = req.tokenPayload;

  try {
    const user = await user.findByPk(id, {
      include: { association: "addresses" },
    });

    if (!user) return res.status(400).send({ message: "user not found" });

    return res.json(user.addresses);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    res.status(500).send({ message: "internal error" });
  }
};
