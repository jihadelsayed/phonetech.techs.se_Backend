module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define("feedbacks", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
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

  return Feedback;
};