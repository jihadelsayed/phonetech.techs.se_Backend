const nodemailer = require("nodemailer");
//const sendgridTransport = require('nodemailer-sendgrid-transporter');

// check if environment variables are set
if (!process.env.transporterHost) {
  console.error("transporterHost environment variable is not set");
  process.exit(1);
}
if (!process.env.transporterPort) {
  console.error("transporterPort environment variable is not set");
  process.exit(1);
}
if (!process.env.transporterUser) {
  console.error("transporterPort environment variable is not set");
  process.exit(1);
}
if (!process.env.transporterPassword) {
  console.error("transporterPort environment variable is not set");
  process.exit(1);
}

const transporter = nodemailer.createTransport(
  //sendgridTransport({auth: {api_key: 'paste-your-api-key-here'}})
  {
    host: process.env.transporterHost,
    port: process.env.transporterPort,
    secure: true,

    auth: {
      user: process.env.transporterUser,
      pass: process.env.transporterPassword,
    },

    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
  }
);

module.exports = async (req, res) => {
  // console.log(`Sending password reset email to ${email}`);

  // // send an email to the user with the reset token
  // // you can use any mailer service of your choice here
  // console.log(`You are receiving this because you (or someone else) have requested the reset of the password for your account.
  // Please click on the following link, or paste this into your browser to complete the process:
  // ${process.env.Frontend_URL}/password/reset?token=${resetToken}
  // If you did not request this, please ignore this email and your password will remain unchanged.`
  // );

  const mailOptions = {
    //from: process.env.transporterUser,
    from: req.body.email,
    //to: "hello@techs.se",
    to: "jihad.alsayed@techs.se",
    subject: req.body.subject ? req.body.subject : "There is no subject",
    text: `
      Name: ${req.body.name}
      subject: ${req.body.subject ? req.body.subject : "There is no subject"}
      Email: ${req.body.email}
      Telefon: ${req.body.phone ? req.body.phone : "There is no phone"}
      Message: ${req.body.description}
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending message");
    }
    console.log(`feedback email sent to ${req.body.email}`);
    res.status(200).send(`feedback har skickats till ${req.body.email}`);
  });
};
