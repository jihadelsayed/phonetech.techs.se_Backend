const bcrypt = require("bcryptjs");
const db = require("../../models");
const userModule = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

module.exports = async (req, res, next) => {
    console.log(req.body);
    const { id } = req.params;
    // patch
    try {
        const user = await userModule.findByPk(id)
        if (user === 0) {
            return res.status(400).send("No update has been made");
        }
        await user.setRoles(req.body.data);
        return res.sendStatus(200);
    } catch (error) {
        console.error(new Date().toUTCString(), "-", error);
        return res.status(500).send({ message: "Internal error" });
    }
}

