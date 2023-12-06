const express = require("express");


const db = require("../../models");
const image = db.image;

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const image = await image.findByPk(id);

    if (!image) return res.status(400).send({ message: "image not found" });

    await image.destroy();

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
