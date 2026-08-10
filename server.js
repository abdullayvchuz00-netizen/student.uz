const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StudentUZ</title>
  <meta name="description" content="StudentUZ o'quvchilar uchun platforma">
</head>

<body>
  <h1>StudentUZ</h1>
  <p>O'quvchilar uchun platforma</p>
  <p>🟢 Server ishlayapti</p>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
