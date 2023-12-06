module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
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

    lastName: {
      type: Sequelize.STRING,
      allowNull: true

    },
    email: {
      type: Sequelize.STRING,
      allowNull: false

    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false

    },
    address: {
      type: Sequelize.STRING,
      allowNull: false

    },
    description: {
      type: Sequelize.STRING,
      allowNull: true

    },
    annualConsumption: {
      type: Sequelize.DECIMAL,
      allowNull: true

    },
    mainFuse: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    electricityCompany: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    roofMaterial: {
      type: Sequelize.STRING,
      allowNull: true

    },
    serviceType: {
      type: Sequelize.STRING,
      allowNull: true

    },
    roofAngle: {
      type: Sequelize.STRING,
      allowNull: true
    },
    proposeRoofArieas: {
      type: Sequelize.STRING,
      allowNull: true
    },
    roofLength: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    roofWidth: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    placementOfInverter: {
      type: Sequelize.STRING,
      allowNull: true

    },
    diggingForCable: {
      type: Sequelize.STRING,
      allowNull: true

    },
    energyStorage: {
      type: Sequelize.STRING,
      allowNull: true

    },
    media: {
      type: Sequelize.STRING,
      allowNull: true

    },
    moreInfo: {
      type: Sequelize.STRING,
      allowNull: true

    },
    contacted: {
      type: Sequelize.STRING,
      allowNull: true

    },
    freeDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    offerSent: {
      type: Sequelize.STRING,
      allowNull: true

    },
    followUpDescr: {
      type: Sequelize.STRING,
      allowNull: true

    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    }
  }, {
    timestamps: true
  });

  return Project;
};