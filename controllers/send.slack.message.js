const { App } = require("@slack/bolt");

// check if environment variables are set
if (!process.env.slackSigning) {
  console.error("slackSigning environment variable is not set");
  process.exit(1);
}
if (!process.env.slackBotToken) {
  console.error("slackBotToken environment variable is not set");
  process.exit(1);
}

const app = new App({
  signingSecret: process.env.slackSigning,
  token: process.env.slackBotToken,
});

module.exports = async (req, res, slackData) => {
  await app.client.chat.postMessage(slackData, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending message to slack");
    }
    console.log(`feedback slack sent to ${req.body.email}`);
    //res.status(200).send(`feedback har skickats till ${req.body.email}`);
  });
};
