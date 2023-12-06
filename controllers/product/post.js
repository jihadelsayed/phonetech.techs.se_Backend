const db = require("../../models");
const productModel = db.product;
const categoryModel = db.category;
var Sequelize = require('sequelize');
//var ImagesPost = require('../image/post');

const Op = Sequelize.Op;


module.exports = async (req, res, next) => {
  try {
    if (req.body.discount_datetime_start)
      req.body.discount_datetime_start = new Date(
        req.body.discount_datetime_start
      );
    if (req.body.discount_datetime_end)
      req.body.discount_datetime_end = new Date(req.body.discount_datetime_end);

    const category = await categoryModel.findByPk(req.body.category);
    console.log(category);
    
    //console.log(req.body)
    //const ImagesPost = postImage(req, res, next)

    const product = await productModel.create({
      title: req.body.title,
      description: req.body.description,
      Make: req.body.Make,
      price: req.body.price,
      quantity_stock: req.body.quantity_stock,
      discount_percent: req.body.discount_percent,
      discount_datetime_start: req.body.discount_datetime_start,
      discount_datetime_end: req.body.discount_datetime_end,
      height: req.body.height,
      width: req.body.width
    });
    const categories = await categoryModel.findAll({
      where: { id: req.body.category }
    });
    await product.setCategories(categories);

    for (let index = 0; index < req.body.images.length; index++) {
      const element = req.body.images[index];
        // const images = await imageModel.findAll({
        //   where: { id: req.body.images[index] }
        // });
        // await product.setImages(images);
    }

   
    return res.json(product);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send("internal error");
  }
};