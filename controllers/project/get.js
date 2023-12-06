const db = require("../../models");
const project = db.project;

module.exports = async (req, res, next) => {
    const { id } = req.params;

    try {
        const projects = await project.findAll({
            attributes: {
            exclude: ["createdAt", "updatedAt"],
            },
            where: {
                parent_id: Number(id),
            },
            order: [["name", "ASC"]],
    });

    return res.json(projects);
    } catch (error) {
        console.error(new Date().toUTCString(), "-", error);
        return res.status(500).json({ message: "internal error" });
    }
};