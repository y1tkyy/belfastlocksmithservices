// index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle email sending
app.post("/send-email", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const mailData = {
    personalizations: [
      {
        to: [{ email: "nikitadudukalo2@gmail.com" }],
      },
    ],
    from: { email: "projectbiz24@gmail.com" },
    subject: subject || "No Subject",
    content: [
      {
        type: "text/plain",
        value: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      },
    ],
  };

  try {
    await axios.post("https://api.sendgrid.com/v3/mail/send", mailData, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    res.status(200).send({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.data : error
    );
    res.status(500).send({ success: false, message: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
