module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define("orders", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    freight_name: {
      type: Sequelize.STRING,
    },
    freight_price: {
      type: Sequelize.DECIMAL,
    },
    invoiceSubtotal: {
      type: Sequelize.DECIMAL,
    },
    invoiceTaxes: {
      type: Sequelize.DECIMAL,
    },
    invoiceTotal: {
      type: Sequelize.DECIMAL,
    },
    payment_method: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "select_payment_method",
    },
    tracking_code: {
      type: Sequelize.STRING,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    }
  }, {
    timestamps: true
  });

  return order;
};
/*
create a new User: create(object)
find a User by id: findByPk(id)
find a User by email: findOne({ where: { email: ... } })
get all Users: findAll()
find all Users by username: findAll({ where: { username: ... } })

*/