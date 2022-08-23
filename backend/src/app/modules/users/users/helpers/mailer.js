import winston from "../../../../../config/winston";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  secure: true,
  port: 587,
  auth: {
    user: "reach_quantum@outlook.com",
    pass: "PocoX2123",
  },
});

export const sendMail = async (toEmail, subject, message) => {
  winston.info("Inside Mail Function");
  var mailOptions = {
    from: "reach_quantum@outlook.com",
    to: toEmail,
    subject: subject,
    text: message,
    html: message,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Hello");
      winston.error(err);
      return;
    }
    winston.info("Mail sent successfully");
  });
};