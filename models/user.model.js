module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    contactPersonId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    companyOrgNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    moms_VAT_nr: {
      type: Sequelize.STRING,
      allowNull: true
    },
    accountStatus: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    postNumber: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    country: {
      type: Sequelize.STRING,
      allowNull: true
    },
    secondaryAddress: {
      type: Sequelize.STRING,
      allowNull: true
    },
    secondaryPostNr: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    secondaryCity: {
      type: Sequelize.STRING,
      allowNull: true
    },
    secondaryCountry: {
      type: Sequelize.STRING,
      allowNull: true
    },
    country: {
      type: Sequelize.STRING,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    job_title: {
      type: Sequelize.STRING,
      allowNull: true
    },
    deleteDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    employmentDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
  });

  return User;
};
/*
create a new User: create(object)
find a User by id: findByPk(id)
find a User by email: findOne({ where: { email: ... } })
get all Users: findAll()
find all Users by username: findAll({ where: { username: ... } })

*/