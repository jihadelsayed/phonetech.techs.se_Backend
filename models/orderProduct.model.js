module.exports = (sequelize, Sequelize) => {
  const OrderProduct = sequelize.define("orderProducts", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    quantityPrice: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    }
  }, {
    timestamps: true
  });

  return OrderProduct;
};
/*
create a new User: create(object)
find a User by id: findByPk(id)
find a User by email: findOne({ where: { email: ... } })
get all Users: findAll()
find all Users by username: findAll({ where: { username: ... } })

*/