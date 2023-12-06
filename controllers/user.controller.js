exports.allAccess = (req, res, next) => {
  res.status(200).send("Public Content.");
};

exports.superuser = (req, res, next) => {
  res.status(200).send("superuser Content.");
};

exports.admin = (req, res, next) => {
  res.status(200).send("Admin Content.");
};

exports.installer = (req, res, next) => {
  res.status(200).send("installer Content.");
};
exports.employee = (req, res, next) => {
  res.status(200).send("employee Content.");
};
exports.company = (req, res, next) => {
  res.status(200).send("company Content.");
};
exports.privateCustomer = (req, res, next) => {
  res.status(200).send("privateCustomer Content.");
};