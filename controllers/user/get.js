const db = require("../../models");
const userModule = db.user;

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModule.findByPk(id, {
      attributes: {
        exclude: ["password"],
      }
    }
      );
    if (!user) return res.status(400).send("user not found" );

    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push(roles[i].name);
      }

    });
    const orders = await user.getOrders();

    return res.status(200).send({
      user,
      roles: authorities,
      orders
    });

    //return res.status(200).send(user);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send( "internal error" );
  }
};
