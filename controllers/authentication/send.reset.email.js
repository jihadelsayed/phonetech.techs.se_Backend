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

module.exports = async (req, res, email, resetToken) => {
  // console.log(`Sending password reset email to ${email}`);

  // // send an email to the user with the reset token
  // // you can use any mailer service of your choice here
  // console.log(`You are receiving this because you (or someone else) have requested the reset of the password for your account.
  // Please click on the following link, or paste this into your browser to complete the process:
  // ${process.env.Frontend_URL}/password/reset?token=${resetToken}
  // If you did not request this, please ignore this email and your password will remain unchanged.`
  // );

  const mailOptions = {
    from: process.env.transporterUser,
    to: email,
    subject:
      "Begäran om lösenordsåterställning för phonetech techs inloggningar",
    text: `Du får detta för att du (eller någon annan) har begärt återställning av lösenordet för ditt konto.
    Klicka på följande länk eller klistra in den i din webbläsare för att slutföra processen:
    ${process.env.Frontend_URL}/password/reset?token=${resetToken}
    Om du inte begärde detta, ignorera detta e-postmeddelande och ditt lösenord kommer att förbli oförändrat.`,
  };
  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
    console.log(`Password reset email sent to ${email}`);
    res
      .status(200)
      .send(
        `Ett e-postmeddelande om lösenordsåterställning har skickats till ${email}`
      );
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: err.message });
  }
};
