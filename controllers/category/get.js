const db = require("../../models");
const category = db.category;

module.exports = async (req, res, next) => {
    const { id } = req.params;

    try {
        const categories = await category.findAll({
            attributes: {
            exclude: ["createdAt", "updatedAt"],
            },
            where: {
                parent_id: Number(id),
            },
            order: [["name", "ASC"]],
    });

    return res.json(categories);
    } catch (error) {
        console.error(new Date().toUTCString(), "-", error);
        return res.status(500).json({ message: "internal error" });
    }
};