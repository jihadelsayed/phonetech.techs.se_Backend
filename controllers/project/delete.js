const db = require("../../models");
const project = db.project;
const product = db.product;

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { transferToId } = req.body;

  try {
    if (Number(id) == Number(transferToId))
      return res
        .status(400)
        .json({ message: "id and transferToId cannot be the same" });

    const project = await project.findByPk(id);

    if (!project)
      return res.status(400).send({ message: "Project not found" });

    const projectToTransfer = await project.findByPk(transferToId);

    if (!projectToTransfer)
      return res
        .status(400)
        .json({ message: "Project to transfer not found" });

    const projects = await project.findAll();

    const hasChildren = projects.filter(
      (projectItem) => projectItem.parent_id == id
    );

    if (hasChildren.length > 0)
      return res
        .status(400)
        .json({ message: "Project to delete must not have childrens" });

    const products = await product.findAll({
      where: {
        project_id: id,
      },
    });

    for (let i = 0; i < products.length; i++) {
      await product.update(
        {
          project_id: transferToId,
        },
        {
          where: {
            id: products[i].id,
          },
        }
      );
    }

    await project.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res
      .status(500)
      .json({ message: "Unexpected error deleting project" });
  }
};
