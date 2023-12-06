module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("tokens", {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      expires: '1h',
    },
  });

  return Token;
};
