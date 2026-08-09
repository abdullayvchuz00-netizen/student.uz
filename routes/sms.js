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

  return res.json({
    status: "success",
    message: "SMS yuborishga tayyor",
    phone: phone
  });
});

module.exports = router;
