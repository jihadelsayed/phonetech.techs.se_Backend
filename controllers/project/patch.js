const db = require("../../models");
const project = db.project;

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [updated] = await project.update(req.body, { where: { id } });

    if (updated == 0)
      return res.status(400).send({ message: "no update has been made" });

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
