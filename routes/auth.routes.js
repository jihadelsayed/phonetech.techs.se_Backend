const signController = require("../controllers/authentication/sign.controller");
const signupController = require("../controllers/authentication/signup.controller");
const requestResetPassword = require("../controllers/authentication/request.reset.password.controller");
const requestUsername = require("../controllers/authentication/request.username.controller");
const resetPassword = require("../controllers/authentication/reset.password.controller");
const { roleMiddleware } = require("../middleware/role.middleware");
const signupMiddleware = require("../middleware/signup.middleware");

module.exports = function (router) {
  router.post('/signup',signupMiddleware, signupController);

  router.post(
    "/signin",
    signController
  );

  router.post('/username/request', requestUsername);
  router.post('/password/reset/request', requestResetPassword);
  router.post('/password/reset', resetPassword);
};
