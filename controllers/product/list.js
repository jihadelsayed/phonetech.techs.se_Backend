const express = require("express");
const sequelize = require("sequelize");
const { Op } = sequelize;

const categoryTree = require("../../utils/category.tree");


const db = require("../../models");
const user = db.user;
const product = db.product;
const order = db.order;
const categoryModel = db.category;

//const ilike = (process.env.NODE_ENV == 'test') ? Op.like : Op.iLike;

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res, next) => {
  try {
      products = await product.findAll({
        attributes: {
          exclude: ["updatedAt", "deletedAt", "category_id"],
        },
        // order,
        include: [
          {
            association: "images",
            attributes: ["id", "url", "filename"],
            required: false,
          },
          {
            association: "categories",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });


    return res.send({products});
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
