const deleteProduct = require("../controllers/product/delete");
const getProduct = require("../controllers/product/get");
const listProduct = require("../controllers/product/list");
const patchProduct = require("../controllers/product/patch");
const postProduct = require("../controllers/product/post");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get(
  //   "/api/product/list",
  //   [authJwt.verifyToken],
  //   listproductController.getproducts
  // );
  // app.post(
  //   "/api/product/add",
  //   [authJwt.verifyToken,

  //     verifyproduct.checkDuplicateproduct],
  //     addproductController.addproducts
  // );
  //getListproducts
  // app.get(
  //   "/api/product/list/:productId",
  //   [authJwt.verifyToken],
  //   listProductsController.getProducts
  // );
  //registerProduct
  // app.post(
  //   "/api/product/add/:productId",
  //   [authJwt.verifyToken,
  //     //need some work
  //     verifyproduct.checkDuplicateProduct],
  //     addProductController.addProduct
  // );
};

