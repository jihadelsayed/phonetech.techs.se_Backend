const db = require("../../models");
const userModule = db.user;

module.exports = async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    const user = await userModule.destroy({ where: { id } });

    if (user == 0)
      return res.status(400).send({ message: "user not found" });
    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
