const express = require("express");
const cors = require("cors");
require("dotenv").config();

const smsRouter = require("./routes/sms");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="uz">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="google-site-verification" content="axKJ6XqePH6qiQF1-tTx9JFuHb6q4cmrYdz1WJ32jgM" />
        <title>StudentUZ</title>
        <meta name="description" content="StudentUZ o'quvchilar uchun platforma">
      </head>
      <body>
        <h1>StudentUZ</h1>
        <p>StudentUZ server ishlayapti</p>
      </body>
    </html>
  `);
});

app.use("/api/sms", smsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
