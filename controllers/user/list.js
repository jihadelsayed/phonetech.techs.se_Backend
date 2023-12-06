const db = require("../../models");
const user = db.user;

//const ilike = (process.env.NODE_ENV == 'test') ? Op.like : Op.iLike;

module.exports = async (req, res, next) => {
  try {
    //const limit = 10//req.query.limit;
    //const offset = 0//req.query.offset;
    // get all users
    const users = await user.findAll({ 
      //limit,
      //offset
    });
    //console.log(JSON.stringify(users, null, 2));

    count = await user.count({col: "id"});

    return res.status(200).send({ count, users: users });
  }
  catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
