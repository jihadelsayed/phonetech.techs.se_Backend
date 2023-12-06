const db = require("../../models");
const feedback = db.feedback;

module.exports = async (req, res, next) => {
  try {
    const feedbacks = await feedback.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["name", "ASC"]],
    });

    return res.json(feedbacks);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
