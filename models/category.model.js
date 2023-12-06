module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    parentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    }
  }, {
    timestamps: true
  });

  return Category;
};