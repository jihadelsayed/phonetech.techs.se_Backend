const nodemailer = require("nodemailer");
//const sendgridTransport = require('nodemailer-sendgrid-transporter');

module.exports = async (req, res, email, username, name) => {
  console.log(process.env.transporterUser);

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
    }
  );
  // send an email to the user with the reset token
  // you can use any mailer service of your choice here
  // console.log('Kära ' + name + ',\n\n'
  // + 'Vi har fått en begäran om att hämta ditt användarnamn. Vi förstår att det kan vara lätt att glömma din inloggningsinformation och vi finns här för att hjälpa dig.\n\n'
  // + 'Ditt användarnamn är: '
  // + username
  // + '\n\nOm du fortsätter att ha problem med att logga in eller om du har några andra frågor, tveka inte att kontakta vårt supportteam. Vi finns här för att hjälpa dig med alla problem du kan ha.\n\n'
  // + 'Tack för att du använder vår tjänst.\n\n'
  // + 'Vänliga hälsningar,\n'
  // + 'phonetech techs\n')

  const mailOptions = {
    from: process.env.transporterUser,
    to: email,
    subject: "Användarnamn för phonetech techs inloggningar",
    text:
      "Kära " +
      name +
      ",\n\n" +
      "Vi har fått en begäran om att hämta ditt användarnamn. Vi förstår att det kan vara lätt att glömma din inloggningsinformation och vi finns här för att hjälpa dig.\n\n" +
      "Ditt användarnamn är: " +
      username +
      " \n\nOm du fortsätter att ha problem med att logga in eller om du har några andra frågor, tveka inte att kontakta vårt supportteam. Vi finns här för att hjälpa dig med alla problem du kan ha.\n\n" +
      "Tack för att du använder vår tjänst.\n\n" +
      "Vänliga hälsningar,\n" +
      "phonetech techs\n",
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    res.status(200).send(`Användarnamnet har skickats till ${email}`);
  });
};
