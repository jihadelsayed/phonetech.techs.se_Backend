const db = require("../../models");

const projectModel = db.project;
const moment = require("moment");
const sendProjectEmail = require("./send.project.email");

const { google } = require("googleapis");
const sendSlackMessage = require("../send.slack.message");
if (!process.env.slackBotToken) {
  console.error("slackBotToken environment variable is not set");
  process.exit(1);
}

module.exports = async (req, res, next) => {
  const date = moment(req.body.availabilityTime);
  const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");

  //console.log(formattedDate);
  const slackData = {
    token: process.env.slackBotToken,
    channel: "order",
    text: `
    Quote Form
      Full name: ${req.body.name}
      Email: ${req.body.email}
      Telefon: ${req.body.phone}
      Message: ${req.body.description}
      Address: ${req.body.address}
      advice: ${req.body.advice}
      roof material: ${req.body.roofMaterial}
      service type: ${JSON.stringify(req.body.serviceType)}
      takshape: ${JSON.stringify(req.body.takShape)}
      Annual consumption: ${req.body.annualConsumption}
      availabilityTime: ${formattedDate}
    `,
  };
  // Free date: ${req.body.roofLength}
  // Free date: ${req.body.roofWidth}
  sendSlackMessage(req, res, slackData);
  sendProjectEmail(req, res);

  console.log(slackData);
  try {
    req.body.serviceType = JSON.stringify(req.body.serviceType);
    const project = await projectModel.create(req.body);

    // create an auth client using your credentials
    const auth = new google.auth.GoogleAuth({
      keyFile: "phonetech.techs-c26d1eda975b.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClientObject = await auth.getClient();

    const googleSheetsInstance = google.sheets({
      version: "v4",
      auth: authClientObject,
    });
    const spreadsheetId = "";
    // insert data into a sheet
    await googleSheetsInstance.spreadsheets.values.append({
      auth, //auth object
      spreadsheetId, //spreadsheet id
      range: "B2:B4", //sheet name and range of cells
      valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
      resource: {
        values: [
          [
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.address,
            req.body.description,
            req.body.roofMaterial,
            JSON.stringify(req.body.serviceType),
            req.body.annualConsumption,
            req.body.freeDate,
          ],
        ],
      },
    });
    return res.json(project);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).send({ message: "internal error" });
  }
};
