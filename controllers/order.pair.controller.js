const db = require("../models");

const order = db.order;

exports.pairProduct = (ws, req) => {
  // on websocut connect
  ws.on("open", () => {
    console.log("connected to phonetech.techs client");
  });
  // on message rescive from websocut
  ws.on("message", (msg) => {
    console.log(msg);
    product.on("message", async function (topic, payload) {
      console.log("message", topic);
      ws.send(payload.toString());
    });
  });
  // on websocut discounect
  ws.on("close", () => {
    console.log("WebSocket was closed");
  });
};
