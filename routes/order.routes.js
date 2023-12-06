const deleteOrder = require("../controllers/order/delete");
const getOrder = require("../controllers/order/get");
const listOrder = require("../controllers/order/list");
const patchOrder = require("../controllers/order/patch");
const printOrder = require("../controllers/order/print");
const postOrder = require("../controllers/order/post");
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
    "/orders",
    authJwt.verifyToken,
    authJwt.isAdmin,

    listOrder
  );
  router.get(
    "/orders/:id",
    authJwt.verifyToken,
    authJwt.isPrivateCustomer,
    getOrder
  );
  router.post(
    "/orders", 
      authJwt.verifyToken,
      authJwt.isAdmin,
      postOrder
  );
  router.post(
    "/orders/:id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    patchOrder
  );
  router.get(
    "/orders/print/:id", 
    [authJwt.verifyToken],
    printOrder
  );
  router.delete(
    "/orders/:id",
    [authJwt.verifyToken, authJwt.isSuperUser],
      deleteOrder
    
  );

  // router.post(
  //   "/orders/:id/payment",
  //   authJwt.verifyToken,
  //   saveOrderPayment
  // );
};

