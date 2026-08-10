const express = require("express");
const cors = require("cors");
require("dotenv").config();

const smsRouter = require("./routes/sms");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.use("/api/sms", smsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
