const db = require("../../models");

const User = db.user;

module.exports = async (name) => {
  let username = name.toLowerCase().replace(/\s/g, "_");

  // Use a transaction to ensure atomicity of the database queries
  const result = await db.sequelize.transaction(async (t) => {
    // Check if the generated username already exists in the database
    let existingUser = await User.findOne({
      where: { username: username },
      transaction: t,
    });

    // If the username already exists, append a suffix to make it unique
    let suffix = 1;
    while (existingUser) {
      username = `${name.toLowerCase().replace(/\s/g, "_")}_${suffix}`;
      suffix++;

      existingUser = await User.findOne({
        where: { username: username },
        transaction: t,
      });
    }

    // Return the final unique username
    return username;
  });

  return result;
};
