module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    Make: {
      type: Sequelize.STRING,
      allowNull: false
    },
    html_body: {
      type: Sequelize.TEXT(5000),
      defaultValue: '<p>Coming soon</p>'
    },

    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },

    quantity_stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },

    quantity_sold: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    discount_percent: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    discount_datetime_start: {
      type: Sequelize.DATE,
      allowNull: true
    },
    discount_datetime_end: {
      type: Sequelize.DATE,
      allowNull: true
    },
    height: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },

    width: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    }
  }, {
    timestamps: true
  });

  return Product;
};
/*
create a new User: create(object)
find a User by id: findByPk(id)
find a User by email: findOne({ where: { email: ... } })
get all Users: findAll()
find all Users by username: findAll({ where: { username: ... } })

*/