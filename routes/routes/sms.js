const express = require("express");

const router = express.Router();

router.post("/send", (req, res) => {
  const { phone, message } = req.body;

  if (!phone) {
    return res.status(400).json({
      status: "error",
      message: "Telefon raqami kerak"
    });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({
      status: "error",
      message: "SMS matni kerak"
    });
  }

  // Hozircha test rejimi.
  // Haqiqiy SMS API keyin ulanadi.
  return res.json({
    status: "ready_to_send",
    message: "SMS yuborishga tayyor",
    phone
  });
});

module.exports = router;
