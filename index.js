const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

// app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({ origin: "https://mfmunic.github.io/" }));
app.use(cors());

app.post("/mail", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error("Failed to create a testing account. " + err.message);
      return process.exit(1);
    }

    console.log("Credentials obtained, sending message...");
    // Message object
    let message = {
      from: `${req.body.address}`,
      to: "ga5pcypj6echogcn@ethereal.email",
      subject: `${req.body.subject}`,
      text: `${req.body.content}`,
      html: `<ul><li>${req.body.address}</li><li>${req.body.subject}</li><li>${
        req.body.content
      }</li></ul>`
    };

    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ga5pcypj6echogcn@ethereal.email",
        pass: "JK991JtF8ndhcHw2hg"
      }
    });

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
  res.end("Recieved!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is on ${PORT}`);
});
