const db = require("../../models");
const feedback = db.feedback;

module.exports = async (req, res, next) => {
    const { id } = req.params;

    try {
        const feedbacks = await feedback.findAll({
            attributes: {
            exclude: ["createdAt", "updatedAt"],
            },
            where: {
                parent_id: Number(id),
            },
            order: [["name", "ASC"]],
    });

    return res.json(feedbacks);
    } catch (error) {
        console.error(new Date().toUTCString(), "-", error);
        return res.status(500).json({ message: "internal error" });
    }
};