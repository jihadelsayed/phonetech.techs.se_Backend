// require('dotenv').config({
//   path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
// });

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: ".env.production" });
} else {
  require("dotenv").config({ path: ".env" });
}

const express = require("express");
const cors = require("cors");
//const webSocket = require("websocket").server
const enableWs = require("express-ws");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
enableWs(app);

var corsOptions = {
  origin: "techs.se",
};

//app.use(cors(corsOptions));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: false }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   initial();
// });
//initial();

// simple route
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to phonetech.techs application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
require("./routes/project.routes")(app);
require("./routes/image.routes")(app);
require("./routes/order.routes")(app);
require("./routes/feedback.routes")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "dist")));

// Catch all other routes & return index file
app.get("*", (req, res, next) => {
  res.send("404 Error!");
  //res.sendFile(path.join(__dirname, 'index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 0,
    name: "superuser",
  });

  Role.create({
    id: 1,
    name: "admin",
  });

  Role.create({
    id: 2,
    name: "installer",
  });
  Role.create({
    id: 3,
    name: "employee",
  });
  Role.create({
    id: 4,
    name: "company",
  });
  Role.create({
    id: 5,
    name: "privateCustomer",
  });
}
