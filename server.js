const express = require("express");

const app = express();

let students = [];

app.get("/", (req, res) => {
  res.send(`

<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>StudentUZ</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f1f5f9;
  color: #0f172a;
}

header {
  background: #2563eb;
  color: white;
  text-align: center;
  padding: 25px;
}

.container {
  max-width: 1000px;
  margin: 25px auto;
  padding: 15px;
}

.card {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,.08);
}

input {
  width: 100%;
  padding: 13px;
  margin: 7px 0;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 16px;
}

button {
  border: 0;
  padding: 12px 16px;
  margin: 6px 4px 0 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
}

.add {
  background: #2563eb;
  color: white;
}

.detail {
  background: #dbeafe;
  color: #1d4ed8;
}

.edit {
  background: #fef3c7;
  color: #92400e;
}

.delete {
  background: #fee2e2;
  color: #991b1b;
}

.save {
  background: #dcfce7;
  color: #166534;
}

.pay {
  background: #16a34a;
  color: white;
}

.debtAdd {
  background: #dc2626;
  color: white;
}

.came {
  background: #22c55e;
  color: white;
}

.absent {
  background: #ef4444;
  color: white;
}

.back {
  background: #e2e8f0;
}

.students {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 15px;
}

.student {
  background: #f8fafc;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
}

.debt {
  color: #dc2626;
  font-weight: bold;
}

.paid {
  color: #16a34a;
  font-weight: bold;
}

.success {
  color: #16a34a;
  font-weight: bold;
}

.error {
  color: #dc2626;
  font-weight: bold;
}

.hidden {
  display: none;
}

#reportButton {
  background: #7c3aed;
  color: white;
  margin-bottom: 20px;
}

</style>
</head>

<body>

<header>
  <h1>🎓 Student.uz</h1>
  <p>O‘quvchilar uchun platforma</p>
</header>

<div class="container">

  <div id="dashboard">

    <div class="card">

      <h2>➕ O‘quvchi qo‘shish</h2>

      <input
        id="studentName"
        type="text"
        placeholder="O‘quvchi ismi"
      >

      <input
        id="studentFee"
        type="number"
        placeholder="Oylik to‘lov"
      >

      <button id="addButton" class="add">
        ➕ Qo‘shish
      </button>

      <p id="addMessage"></p>

    </div>

    <button id="reportButton">
      📊 Hisobotlar
    </button>

    <div class="card">

      <h2>👨‍🎓 O‘quvchilar</h2>

      <div id="studentsList" class="students"></div>

    </div>

  </div>

  <div id="details" class="hidden">

    <div class="card">

      <button id="backButton" class="back">
