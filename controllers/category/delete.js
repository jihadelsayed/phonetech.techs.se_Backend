const db = require("../../models");
const category = db.category;
const product = db.product;

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { transferToId } = req.body;

  try {
    if (Number(id) == Number(transferToId))
      return res
        .status(400)
        .json({ message: "id and transferToId cannot be the same" });

    const category = await category.findByPk(id);

    if (!category)
      return res.status(400).send({ message: "Category not found" });

    const categoryToTransfer = await category.findByPk(transferToId);

    if (!categoryToTransfer)
      return res
        .status(400)
        .json({ message: "Category to transfer not found" });

    const categories = await category.findAll();

    const hasChildren = categories.filter(
      (categoryItem) => categoryItem.parent_id == id
    );

    if (hasChildren.length > 0)
      return res
        .status(400)
        .json({ message: "Category to delete must not have childrens" });

    const products = await product.findAll({
      where: {
        category_id: id,
      },
    });

    for (let i = 0; i < products.length; i++) {
      await product.update(
        {
          category_id: transferToId,
        },
        {
          where: {
            id: products[i].id,
          },
        }
      );
    }

    await category.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res
      .status(500)
      .json({ message: "Unexpected error deleting category" });
  }
};
