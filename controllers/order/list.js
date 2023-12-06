const db = require("../../models");
const Order = db.order;

module.exports = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming the user ID is stored in the req.user object
    
    const orders = await Order.findAll({
      // where: { user_id: userId },
      // attributes: { exclude: ["updatedAt", "address_id", "user_id"] },
      include: [
        {
          association: "orderProducts",
   
        },
        {
          attributes: {
            exclude: ["password"],
            },
          association: "users",
   
        },
        // {
        //   association: "address",
        //   attributes: { exclude: ["createdAt", "updatedAt", "user_id"] },
        //   required: false,
        // },
        // {
        //   association: "products",
        //   attributes: ["id", "title"],
        //   through: {
        //     attributes: [
        //       "quantity_buyed",
        //       "product_price",
        //       "product_discount_percent",
        //     ],
        //   },
        //   required: false,
        //   paranoid: false,
        //   include: {
        //     association: "images",
        //     attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
        //     limit: 1,
        //     required: false,
        //   },
        // },
       ],
    });
    return res.json(orders);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
