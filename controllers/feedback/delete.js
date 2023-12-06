const db = require("../../models");
const feedback = db.feedback;
const product = db.product;

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { transferToId } = req.body;

  try {
    if (Number(id) == Number(transferToId))
      return res
        .status(400)
        .json({ message: "id and transferToId cannot be the same" });

    const feedback = await feedback.findByPk(id);

    if (!feedback)
      return res.status(400).send({ message: "Feedback not found" });

    const feedbackToTransfer = await feedback.findByPk(transferToId);

    if (!feedbackToTransfer)
      return res
        .status(400)
        .json({ message: "Feedback to transfer not found" });

    const feedbacks = await feedback.findAll();

    const hasChildren = feedbacks.filter(
      (feedbackItem) => feedbackItem.parent_id == id
    );

    if (hasChildren.length > 0)
      return res
        .status(400)
        .json({ message: "Feedback to delete must not have childrens" });

    const products = await product.findAll({
      where: {
        feedback_id: id,
      },
    });

    for (let i = 0; i < products.length; i++) {
      await product.update(
        {
          feedback_id: transferToId,
        },
        {
          where: {
            id: products[i].id,
          },
        }
      );
    }

    await feedback.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res
      .status(500)
      .json({ message: "Unexpected error deleting feedback" });
  }
};
