// const sequelizeConnection = require("../../database/sequelize/connection");
// const { socketEmitNewOrder } = require("../../websocket/socketConnection");

const db = require("../../models");
const orderModel = db.order;
const orderProductModel = db.orderProduct;
const userModel = db.user;
const productModel = db.product;
const crypto = require("crypto");
const authJwt = require("../../middleware/authJWT");
// const buyOrderTemplate = require("../../services/mailer/templates/buyOrderTemplate");
// const { sendEmailQueue } = require("../../backgroundJobs/queues");

// Function to generate a unique tracking code
function generateTrackingCode() {
  const randomBytes = crypto.randomBytes(6);
  return randomBytes.toString("hex").toUpperCase();
}

module.exports = async (req, res, next) => {
  try {
    // Set default values for the order
    req.body.freight_name = "phonetech.techs Freight";
    req.body.freight_price = 0;
    req.body.payment_method = "Bank Transfer";
    req.body.status = "Beställt";
    let user;

    // Generate a unique tracking code for the order
    let tracking_code = generateTrackingCode();

    // Check if the tracking code is unique, and generate a new one until it is unique
    let isUnique = false;
    while (!isUnique) {
      const existingOrder = await orderModel.findOne({
        where: { tracking_code: tracking_code },
      });
      isUnique = !existingOrder;
      if (!isUnique) {
        tracking_code = generateTrackingCode();
      }
    }

    // Find the user who placed the order
    if (req.body.cart.customer) {
      authJwt.isAdmin;
      user = await userModel.findOne({
        where: { username: req.body.cart.customer },
      });
    } else {
      user = await userModel.findOne({ where: { id: req.userId } });
    }

    // Create the order
    const order = await orderModel.create({
      freight_name: req.body.freight_name,
      freight_price: req.body.freight_price,
      invoiceSubtotal: req.body.cart.invoiceSubtotal,
      invoiceTaxes: req.body.cart.invoiceTaxes,
      invoiceTotal: req.body.cart.invoiceTotal,
      payment_method: req.body.payment_method,
      status: req.body.status,
      tracking_code: tracking_code,
    });

    // Add the order to the user's orders list
    await user.addOrder(order);

    // Create order products for each product in the cart
    const orderProducts = [];

    for (let index = 0; index < req.body.cart.product.length; index++) {
      const element = req.body.cart.product[index];

      const orderProduct = await orderProductModel.create({
        quantity: element.quantity,
        quantityPrice: element.quantityPrice,
      });

      const product = await productModel.findByPk(element.product.id);

      await orderProduct.setProducts(product);

      orderProducts.push(orderProduct);
    }

    await order.addOrderProducts(orderProducts);

    return res.json(order);

    // create many to many relationship between the order and the product order
    // for (let i = 0; i < products.length; i++) {
    //   await order.addProduct(products[i], {
    //     through: {
    //       quantity_buyed: quantity_buyed[i],
    //       product_price: products[i].price,
    //       product_discount_percent: products[i].isOnSale
    //         ? products[i].discount_percent
    //         : 0,
    //     },
    //     transaction,
    //   });

    //   products[i].quantity_sold += quantity_buyed[i];
    //   products[i].quantity_stock -= quantity_buyed[i];
    //   await products[i].save({
    //     transaction,
    //   });
    // }
    // const categories = await productModel.findAll({
    //   where: { id: req.body.category }
    // });
    // await product.setCategories(categories);

    // for (let index = 0; index < req.body.images.length; index++) {
    //   const element = req.body.images[index];
    //     // const images = await imageModel.findAll({
    //     //   where: { id: req.body.images[index] }
    //     // });
    //     // await product.setImages(images);
    // }
    // const {
    //   products_id,
    //   quantity_buyed,
    //   freight_name,
    //   freight_price,
    //   address_id,
    // } = req.body;

    // const user_id = req.tokenPayload.id;

    // const transaction = await sequelizeConnection.transaction();

    // try {
    //   // verify if user and his address exists
    //   let user = await user.findByPk(user_id, {
    //     include: {
    //       association: "addresses",
    //       where: { id: address_id },
    //       required: false,
    //     },
    //   });

    //   if (!user) return res.status(400).send({ message: "user not found" });
    //   if (user.addresses.length == 0)
    //     return res.status(400).send({ message: "address not found" });

    //   // verify if all products exists and have enough stock
    //   let products = [];
    //   let errorProduct;
    //   for (let i = 0; i < products_id.length; i++) {
    //     const product = await product.findByPk(products_id[i]);

    //     if (!product) {
    //       errorProduct = "product id " + products_id[i] + " not found";
    //       break;
    //     }

    //     if (product.quantity_stock < quantity_buyed[i]) {
    //       errorProduct =
    //         "product id " + products_id[i] + " dont have enough stock";
    //       break;
    //     }

    //     products.push(product);
    //   }

    //   if (errorProduct) return res.status(400).send({ message: errorProduct });

    //   // calculates total price
    //   let total_price = 0;
    //   for (let i = 0; i < products.length; i++) {
    //     total_price += Number(products[i].finalPrice) * Number(quantity_buyed[i]);
    //   }

    //   // create order
    //   const order = await order.create(
    //     {
    //       user_id,
    //       freight_name,
    //       freight_price: Number(freight_price).toFixed(2),
    //       total_price: total_price.toFixed(2),
    //       address_id,
    //     },
    //     {
    //       transaction,
    //     }
    //   );

    //   // add products to order and subtract from stock
    //   for (let i = 0; i < products.length; i++) {
    //     await order.addProduct(products[i], {
    //       through: {
    //         quantity_buyed: quantity_buyed[i],
    //         product_price: products[i].price,
    //         product_discount_percent: products[i].isOnSale
    //           ? products[i].discount_percent
    //           : 0,
    //       },
    //       transaction,
    //     });

    //     products[i].quantity_sold += quantity_buyed[i];
    //     products[i].quantity_stock -= quantity_buyed[i];
    //     await products[i].save({
    //       transaction,
    //     });
    //   }

    //   await order.save({ transaction });
    //   await transaction.commit();

    //   try {
    //     const newOrder = await order.reload({
    //       include: {
    //         association: "products",
    //         attributes: ["id", "title"],
    //         through: {
    //           attributes: [
    //             "quantity_buyed",
    //             "product_price",
    //             "product_discount_percent",
    //           ],
    //         },
    //         /*include: {
    //               association: 'images',
    //               attributes: ['id', 'filename'],
    //           }*/
    //       },
    //     });

    //     socketEmitNewOrder(newOrder);

    //     const template = buyOrderTemplate(
    //       products,
    //       quantity_buyed,
    //       freight_price,
    //       total_price
    //     );

    //     await sendEmailQueue.add({
    //       from: "donotreply@companyname.com",
    //       to: user.email,
    //       subject: "E-Commerce - Confirmação de compra",
    //       template,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "Internal error" });
  }
};
