const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1->Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMIAL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2->Email Options
  const mailOptions = {
    from: 'Dhananjay Pant <pantpriyanshu31@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3->Send The Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
