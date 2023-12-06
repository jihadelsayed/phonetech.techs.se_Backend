const db = require("../../models");
const project = db.project;

module.exports = async (req, res, next) => {
  try {
    const projects = await project.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["name", "ASC"]],
    });

    return res.json(projects);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
