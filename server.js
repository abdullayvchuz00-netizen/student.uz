const express = require("express");
const cors = require("cors");
require("dotenv").config();

const smsRouter = require("./routes/sms");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "StudentUZ server ishlayapti"
  });
});

app.use("/api/sms", smsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
