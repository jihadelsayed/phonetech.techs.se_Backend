const deleteFeedback = require("../controllers/feedback/delete");
const getFeedback = require("../controllers/feedback/get");
const listFeedbacks = require("../controllers/feedback/list");
const patchFeedback = require("../controllers/feedback/patch");
const postFeedback = require("../controllers/feedback/post");
const authJwt = require("../middleware/authJWT");

module.exports = function (router) {
  router.get(
    "/feedbacks", 
    listFeedbacks
  );
  router.post(
    "/feedbacks",
    postFeedback
  );
  router.put(
    "/feedbacks/:id",
    authJwt.isEmployee,
    patchFeedback
  );
  router.delete(
    "/feedbacks/:id",
    authJwt.isSuperUser,
    deleteFeedback
  );
};