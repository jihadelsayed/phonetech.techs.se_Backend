const db = require("../../models");
const productModule = db.product;

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModule.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "category_id"],
      },
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
    if (!product) return res.status(400).send("product not found" );
    return res.status(200).send(product);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send( "internal error" );
  }
};
