const db = require("../../models");
const sendSlackMessage = require("../send.slack.message");
const feedbackModel = db.feedback;
const sendFeedBackEmail = require("./send.feedback.email");

module.exports = async (req, res, next) => {
  console.log(req.body);

  try {
    const feedback = await feedbackModel.create(req.body);
    const slackData = {
      token: process.env.slackBotToken,
      channel: "contact",
      text: `
        Name: ${req.body.name}
        subject: ${req.body.subject ? req.body.subject : "There is no subject"}
        Email: ${req.body.email} 
        Telefon: ${req.body.phone ? req.body.phone : "There is no phone"}
        Message: ${req.body.description}
      `,
    };
    sendSlackMessage(req, res, slackData);
    sendFeedBackEmail(req, res);
    return res.json(feedback);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
