// const express = require("express");

// const db = require("../../models");
const product = db.product;
// const { flushProduct } = require("../../database/sonic/flushObject");
// const { ingestProduct } = require("../../database/sonic/ingest");

// /** @param {express.Request} req * @param {express.Response} res */
// module.exports = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const [updated] = await product.update(req.body, { where: { id } });

//     if (updated == 0)
//       return res.status(400).send({ message: "no update has been made" });

//     if (req.body.title) {
//       await flushProduct(id);
//       await ingestProduct(id, req.body.title);
//     }

//     return res.sendStatus(200);
//   } catch (error) {
//     console.error(new Date().toUTCString(), "-", error);
//     return res.status(500).send({ message: "internal error" });
//   }
// };
