const db = require("../../models");
const category = db.category;

module.exports = async (req, res, next) => {
  try {
    const categories = await category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["name", "ASC"]],
    });

    return res.json(categories);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
