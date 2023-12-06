const db = require("../../models");
const categoryModel = db.category;

module.exports = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.body.parent_id) {
      const parent = await categoryModel.findByPk(req.body.parent_id);
      if (!parent)
        return res
          .status(400)
          .json({ message: "parent category id not found" });
    }
    const category = await categoryModel.create(req.body);

    return res.json(category);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
