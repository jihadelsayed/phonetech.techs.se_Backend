const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  dialectOptions: {
    native: true,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

// Create relationship and table
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.image = require("../models/image.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.orderProduct = require("./orderProduct.model.js")(sequelize, Sequelize);
db.token = require("./token.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.feedback = require("./feedback.model.js")(sequelize, Sequelize);

// role and user many to many relationship
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// product and category many to many relationship
db.category.belongsToMany(db.product, {
  through: "category_products",
  foreignKey: "categoryId",
  otherKey: "productId",
});
db.product.belongsToMany(db.category, {
  through: "category_products",
  foreignKey: "productId",
  otherKey: "categoryId",
});
// product and order one to many relationship
db.product.belongsToMany(db.order, {
  through: "product_orders",
  foreignKey: "productId",
  otherKey: "orderId",
});

// product and category many to many relationship
db.image.belongsToMany(db.product, {
  through: "product_images",
  foreignKey: "categoryId",
  otherKey: "productId",
});
// product has many images
db.product.belongsToMany(db.image, {
  through: "product_images",
  foreignKey: "productId",
  as: "images",
});

// order products belong to many product and order
db.product.belongsToMany(db.orderProduct, {
  through: "orderProduct_products",
  foreignKey: "productId",
  otherKey: "orderProductId",
});
db.orderProduct.belongsToMany(db.product, {
  through: "orderProduct_products",
  foreignKey: "orderProductId",
  otherKey: "productId",
});

db.order.belongsToMany(db.orderProduct, {
  through: "orderProduct_orders",
  foreignKey: "orderId",
  otherKey: "orderProductId",
});
db.orderProduct.belongsToMany(db.order, {
  through: "orderProduct_orders",
  foreignKey: "orderProductId",
  otherKey: "orderId",
});

//db.user.hasMany(db.order);

// order and user many to many relationship
db.order.belongsToMany(db.user, {
  through: "user_orders",
  foreignKey: "orderId",
  otherKey: "userId",
});
db.user.belongsToMany(db.order, {
  through: "user_orders",
  foreignKey: "userId",
  otherKey: "orderId",
});

db.ROLES = [
  "superuser",
  "admin",
  "installer",
  "employee",
  "company",
  "privateCustomer",
];

module.exports = db;
