const authJwt = require("../middleware/authJWT");
const controller = require("../controllers/user.controller");
const listUsers = require("../controllers/user/list");
const getUser = require("../controllers/user/get");
const patchUser = require("../controllers/user/patch");
const deleteUser = require("../controllers/user/delete");
const patchRoles = require("../controllers/authentication/roles.patch.controller");

module.exports = function (router) {
  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // router.get("/all", controller.allAccess);
  // router.get("/auth/me", controller.allAccess);

  // router.get(
  //   "/user",
  //   [authJwt.verifyToken],
  //   controller.user
  // );
  router.get(
    "/users",
    [authJwt.verifyToken, authJwt.isEmployee],
    listUsers
  );
  router.patch(
    "/users/:id",
    [authJwt.verifyToken, authJwt.isEmployee],
    patchUser
  );
  router.delete(
    "/users/:id",
    [authJwt.verifyToken, authJwt.isSuperUser],
    deleteUser
  );
  router.patch(
    "/roles/:id",
    [authJwt.verifyToken, authJwt.isEmployee],
    patchRoles
  );
  router.get(
    "/users/:id",
    [authJwt.verifyToken, authJwt.isEmployee],
    getUser
  );
  router.get(
    "/superuser",
    [authJwt.verifyToken, authJwt.isSuperUser],
    controller.superuser
  );
  router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.admin
  );
  router.get(
    "/installer",
    [authJwt.verifyToken, authJwt.isInstaller],
    controller.installer
  );
  router.get(
    "/employee",
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.employee
  );
  router.get(
    "/company",
    [authJwt.verifyToken, authJwt.isCompany],
    controller.company
  );
  router.get(
    "/privateCustomer",
    [authJwt.verifyToken, authJwt.isPrivateCustomer],
    controller.privateCustomer
  );
};
