const db = require("../models");
const images = db.images;
const productModule = db.product;
const fs = require("fs");

const request = require("request");

const imagePath = "logo.png";
const nasUrl = "https://phonetech.techs-nas.direct.quickconnect.to:50815/";
const nasApi = "SYNO.FileStation.Upload";
const formData = {
  api: nasApi,
  version: "2",
  method: "upload",
  path: "/phonetech.techs/images/",
  file: fs.createReadStream(imagePath),
};

const options = {
  url: nasUrl,
  formData: formData,
  auth: {
    user: "jehad.sayed",
    pass: "kerBiv-tuqpin-junba8",
  },
};
// module.exports = async (req, res, next) => {
//   if (req.body.images) {
//     for (let i = 0; i < req.body.images.length; i++) {
//       if (!images.includes(req.body.images[i])) {
//         res.status(400).send({
//           message: "Failed! Role does not exist = " + req.body.images[i]
//         });
//         return;
//       }
//     }
//   }
//   next();
// };
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const files = req.body.images;

  try {
    // const productData = await db.product.findByPk(id);

    // if (!productData) {
    //   for (let file of files) {
    //     if (process.env.IMG_STORAGE_LOCATION === "local") {
    //       await unlinkAsync(file.path);
    //     }
    //   }

    //   return res.status(400).send({ "product not found" });
    // }

    const images = [];
    console.log(files[0]);

    for (let file of files) {
      console.log(file);

      images.push({
        url: file.path,
        filename: file.name,
      });

      request.post(options, (err, httpResponse, body) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        return res.status(500).send(body);
      });

      const dbImages = await db.image.create({
        url: file.path,
        filename: file.name,
      });
      console.log(dbImages);
    }

    return res.status(200).send(images);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res
      .status(500)
      .send({ message: `internal error: ${error.message}` });
  }
};
