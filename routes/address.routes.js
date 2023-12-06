const deleteAddress = require("../controllers/address/delete");
const getAddress = require("../controllers/address/get");
const listAddress = require("../controllers/address/list");
const patchAddress = require("../controllers/address/patch");
const postAddress = require("../controllers/address/post");
const authJwt = require("../middleware/authJWT");

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  router.get(
    "/addresses",
    authJwt.verifyToken,
    listAddress
  );
  router.post(
    "/addresses",
    authJwt.verifyToken,
    postAddress
  );
  router.put(
    "/addresses/:id",
    authJwt.verifyToken,
    patchAddress
  );
  router.delete(
    "/addresses/:id",
    [authJwt.verifyToken, authJwt.isSuperUser],

    deleteAddress
  );
  
};

