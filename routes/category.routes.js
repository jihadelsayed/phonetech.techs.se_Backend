const deleteCategory = require("../controllers/category/delete");
const getCategory = require("../controllers/category/get");
const listCategories = require("../controllers/category/list");
const patchCategory = require("../controllers/category/patch");
const postCategory = require("../controllers/category/post");
const authJwt = require("../middleware/authJWT");

module.exports = function (router) {
  router.get(
    "/categories", 
    listCategories
  );
  router.post(
    "/categories",
    [authJwt.verifyToken, authJwt.isAdmin],
    postCategory
  );
  router.put(
    "/categories/:id",
    authJwt.isAdmin,
    patchCategory
  );
  router.delete(
    "/categories/:id",
    authJwt.isSuperUser,
    deleteCategory
  );
};