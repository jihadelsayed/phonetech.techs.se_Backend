
const db = require("../../models");
const orderModel = db.order;
const authJwt = require("../../middleware/authJWT");

module.exports = async (req, res, next) => {
    console.log(req.body.data);
    const { id } = req.params;
    // patch
    try {
        const [updated] = await orderModel.update(req.body.data, { where: { id } });

        if (updated === 0) {
            return res.status(400).send("No update has been made");
        }

        return res.sendStatus(200);
    } catch (error) {
        console.error(new Date().toUTCString(), "-", error);
        return res.status(500).send({ message: "Internal error" });
    }
};

