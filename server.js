const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta name="google-site-verification" content="axKJ6XqePH6qiQF1-tTx9JFuHb6q4cmrYdz1WJ32jgM">

  <title>StudentUZ</title>

  <meta
    name="description"
    content="StudentUZ — o‘quvchilar uchun zamonaviy platforma"
  />

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f4f7fb;
      color: #222;
    }

    header {
      background: #2563eb;
      color: white;
      padding: 25px;
      text-align: center;
    }

    main {
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
    }

    .card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
      text-align: center;
    }

    h1 {
      margin-bottom: 10px;
    }

    p {
      color: #555;
      font-size: 17px;
    }

    .status {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 18px;
      background: #dcfce7;
      color: #166534;
      border-radius: 20px;
      font-weight: bold;
    }
  </style>
</head>

<body>

  <header>
    <h1>StudentUZ</h1>
    <p style="color:white;">
      O‘quvchilar uchun platforma
    </p>
