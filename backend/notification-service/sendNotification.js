const nodemailer = require("nodemailer");
const { amq_init } = require('../message-queue/amq_init')
require('dotenv').config()

const sendGmail = async (userEmail) => {
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
    subject: `Terra Account Created`,
    html: `
    <div style="
    background-color: orange;
    color: white;
    width: 100%;
    padding: 20px;
    text-align: center;
    ">
      <h1>Welcome to Terra, your new world to find your world</h1>
      <p>We are truly excited to see you on our platform</p>
      <p>Can't wait for you to browse newly added properties</p>
    </div>
    `,
  });
};

amq_init("sub", sendGmail, "user-account-created")
