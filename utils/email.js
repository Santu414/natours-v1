const nodemailer = require("nodemailer");

const sendEmail= async options => {
  // 1) Create a transports
  const transports = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activete in gmail "less secure app" option
  });

  // 2) Define email options

  const mailOptions = { 
    from:'Jonas Schmedtmann <hello@jonas.io>',
    to:options.email,
    subject:options.subject,
    text:options.message
  }
  // 3) Actually send the email

 await transporter.sendEmail(mailOptions)

}

module.exports= sendEmail
