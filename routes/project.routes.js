const deleteProject = require("../controllers/project/delete");
const getProject = require("../controllers/project/get");
const listProjects = require("../controllers/project/list");
const patchProject = require("../controllers/project/patch");
const postProject = require("../controllers/project/post");
const authJwt = require("../middleware/authJWT");

module.exports = function (router) {
  router.get(
    "/projects", 
    listProjects
  );
  router.post(
    "/projects",
    // [authJwt.verifyToken, authJwt.isEmployee],
    postProject
  );
  router.put(
    "/projects/:id",
    authJwt.isEmployee,
    patchProject
  );
  router.delete(
    "/projects/:id",
    authJwt.isSuperUser,
    deleteProject
  );
};