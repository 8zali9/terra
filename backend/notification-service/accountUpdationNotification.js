const nodemailer = require("nodemailer");
const { amq_init } = require('../message-queue/amq_init')
require('dotenv').config()

const accountUpdationEmail = async (userEmail) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.Gmail,
      pass: process.env.GmailPassword,
    },
  });

  let info = await transporter.sendMail({
    from: "Terra <terra.k4.org@gmail.com>",
    to: userEmail,
    subject: `Terra Account Updated`,
    html: `
    <div style="
    background-color: orange;
    color: white;
    width: 100%;
    padding: 20px;
    text-align: center;
    ">
      <h1>Your profile got updated</h1>
      <p>If this wasn't you, please contact our support team immediately</p>
      <a href='terra.k4.org@gmail.com'>Terra Support</a>
    </div>
    `,
  });
};

amq_init("sub", accountUpdationEmail, "account-updation-notification")