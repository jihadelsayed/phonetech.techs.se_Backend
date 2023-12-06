const express = require("express");

const db = require("../../models");
const orderModule = db.order ;

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res, next) => {
  const orderId = Number(req.params.id);
  const userId = req.userId;

  try {
    const order = await orderModule.findByPk(orderId, {
      include: [
        // {
        //   association: "address",
        // },
        {
          association: "orderProducts",
          include: [ {
            association: "products",
          },
          ]
        },
        {
          attributes: {
            exclude: ["password"],
            },
          association: "users",

        },
      ],
    });

    if (order == null)
      return res.status(400).send({ message: "Buy order not found" });

    // if (order.user_id != userId)
    //   return res.status(403).send({ message: "Not allowed" });
    return res.json(order);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "Error searching order" });
  }
};
