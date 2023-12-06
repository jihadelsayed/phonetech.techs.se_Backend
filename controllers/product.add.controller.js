const db = require("../models");
const order = db.order;

exports.addProduct = (req, res) => {
  var params = {
    thingName: req.body.serialNumber,
    attributePayload: {
      attributes: {
        Org: "phonetech.techs.se",
      },
      merge: false,
    },
    thingTypeName: "Router",
  };
};
