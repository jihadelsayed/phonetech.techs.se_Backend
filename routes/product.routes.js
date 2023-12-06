const deleteProduct = require("../controllers/product/delete");
const getProduct = require("../controllers/product/get");
const listProduct = require("../controllers/product/list");
// const patchProduct = require("../controllers/product/patch");
const postProduct = require("../controllers/product/post");
// //const search = require("../controllers/products/search");
const authJwt = require("../middleware/authJWT");
const imagesMiddleware = require("../middleware/images.middleware");


// const deleteImage = require("../controllers/image/delete");
// const postImage = require("../controllers/image/post");

// const apicache = require("apicache");
// const cache = apicache.middleware("1 minute", null, {
//   enabled: process.env.NODE_ENV != "test",
//   statusCodes: {
//     include: [200],
//   },
// });

module.exports = function (router) {
  // router.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });
  // router.get(
  //   "/products/list",
  //   search.search
  // );
  router.get(
    "/products",
    listProduct
  );
  router.get(
    "/product/:id",
    getProduct
  );
  router.post(
    "/products",
    [authJwt.verifyToken, authJwt.isAdmin],
    //imagesMiddleware,
    postProduct

  );
  // router.put(
  //   "/products/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   patchProduct
  // );
  router.delete(
    "/product/:id",
    [authJwt.verifyToken, authJwt.isSuperUser],
    deleteProduct
  );
  // router.post(
  //   "/products/:id/images",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   postImage
  // );
  // router.delete(
  //   "/products/images/:id",
  //   [authJwt.verifyToken,     authJwt.isSuperUser],
  //   deleteImage
  // );
};