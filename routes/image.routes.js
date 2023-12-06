const deleteImage = require("../controllers/image/delete");
const getImage = require("../controllers/image/get");
const listImage = require("../controllers/image/list");
const patchImage = require("../controllers/image/patch");
const postImage = require("../controllers/image/post");
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
    "/image/list",
    [authJwt.verifyToken],
    listImage
  );
  router.post(
    "/image",
    [authJwt.verifyToken],
    postImage
  );
  
  router.get(
    "/image/:imageId",
    [authJwt.verifyToken],
    getImage
  );
  
  router.put(
    "/image/:imageId",
    [authJwt.verifyToken],
    patchImage
  );

  router.delete(
    "/image/:imageId",
    [authJwt.verifyToken],
    authJwt.isSuperUser,

    deleteImage
  );
  
};