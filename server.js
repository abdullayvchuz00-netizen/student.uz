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
      padding: 20px;
      text-align: center;
    }

    header h1 {
      margin: 0;
    }

    .container {
      max-width: 1000px;
      margin: 30px auto;
      padding: 15px;
    }

    .welcome {
      background: white;
      padding: 25px;
      border-radius: 16px;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    .welcome h2 {
      margin-top: 0;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .card {
      background: white;
      padding: 22px;
      border-radius: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    .card h3 {
      margin-top: 0;
      color: #475569;
    }

    .number {
      font-size: 30px;
      font-weight: bold;
      margin: 10px 0;
    }

    .green {
      color: #16a34a;
    }

    .red {
      color: #dc2626;
    }

    .blue {
      color: #2563eb;
    }

    .section {
      background: white;
      margin-top: 20px;
      padding: 25px;
      border-radius: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    .section h2 {
      margin-top: 0;
    }

    button {
      border: none;
      padding: 12px 18px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 15px;
      margin: 5px;
    }

    .come {
      background: #dcfce7;
      color: #166534;
    }

    .notcome {
      background: #fee2e2;
      color: #991b1b;
    }

    .pay {
      background: #dbeafe;
      color: #1d4ed8;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 7px 0;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 15px;
    }

    .status {
      display: inline-block;
      padding: 8px 14px;
      border-radius: 20px;
      background: #dcfce7;
      color: #166534;
      font-weight: bold;
    }
  </style>
</head>

<body>

<header>
  <h1>🎓 StudentUZ</h1>
  <p>O‘quvchilar boshqaruv platformasi</p>
</header>

<div class="container">

  <div class="welcome">
    <h2>Xush kelibsiz!</h2>
    <p>O‘quvchi ma'lumotlarini boshqarish paneli.</p>
    <span class="status">🟢 Tizim ishlayapti</span>
  </div>

  <div class="cards">

    <div class="card">
      <h3>👨‍🎓 O‘quvchilar</h3>
      <div class="number blue" id="students">0</div>
      <p>Jami o‘quvchi</p>
    </div>

    <div class="card">
      <h3>📅 Bugun</h3>
      <div class="number green" id="came">0</div>
      <p>Keldi</p>
    </div>

    <div class="card">
      <h3>❌ Davomat</h3>
      <div class="number red" id="absent">0</div>
      <p>Kelmadi</p>
    </div>

    <div class="card">
      <h3>💰 Qarzdorlik</h3>
      <div class="number red" id="debt">0 so'm</div>
      <p>Jami qarz</p>
    </div>

  </div>

  <div class="section">

    <h2>👨‍🎓 O‘quvchi qo‘shish</h2>

    <input
      id="studentName"
      type="text"
      placeholder="O‘quvchi ismi"
    >

    <input
      id="monthlyFee"
      type="number"
      placeholder="Oylik to‘lov"
    >

    <button class="pay" onclick="addStudent()">
      ➕ O‘quvchi qo‘shish
    </button>

    <p id="message"></p>

  </div>

  <div class="section">

    <h2>📋 Davomat</h2>

    <button class="come" onclick="markCome()">
      ✅ Keldi
    </button>

    <button class="notcome" onclick="markAbsent()">
      ❌ Kelmadi
    </button>

    <p id="attendanceMessage">
      Bugungi davomat hali belgilanmagan.
    </p>

  </div>

  <div class="section">

    <h2>💰 To‘lov</h2>

    <input
      id="payment"
      type="number"
      placeholder="To‘lov summasi"
    >

    <button class="pay" onclick="makePayment()">
      💳 To‘lov qabul qilish
    </button>

    <p id="paymentMessage"></p>

  </div>

</div>

<script>

let studentCount = 0;
let cameCount = 0;
let absentCount = 0;
let totalDebt = 0;

function addStudent() {

  const name =
    document.getElementById("studentName").value;

  const fee =
    Number(document.getElementById("monthlyFee").value);

  if (!name || !fee) {
    document.getElementById("message").textContent =
      "❌ Ism va oylik to‘lovni kiriting.";
    return;
  }

  studentCount++;
  totalDebt += fee;

  document.getElementById("students").textContent =
    studentCount;

  document.getElementById("debt").textContent =
    totalDebt.toLocaleString() + " so'm";

  document.getElementById("message").textContent =
    "✅ " + name + " qo‘shildi!";

  document.getElementById("studentName").value = "";
  document.getElementById("monthlyFee").value = "";
}

function markCome() {

  cameCount++;

  document.getElementById("came").textContent =
    cameCount;

  document.getElementById("attendanceMessage").textContent =
    "✅ O‘quvchi bugun keldi.";
}

function markAbsent() {

  absentCount++;

  document.getElementById("absent").textContent =
    absentCount;

  document.getElementById("attendanceMessage").textContent =
    "❌ O‘quvchi bugun kelmadi.";
}

function makePayment() {

  const amount =
    Number(document.getElementById("payment").value);

  if (!amount) {
    document.getElementById("paymentMessage").textContent =
      "❌ To‘lov summasini kiriting.";
    return;
  }

  totalDebt -= amount;

  if (totalDebt < 0) {
    totalDebt = 0;
  }

  document.getElementById("debt").textContent =
    totalDebt.toLocaleString() + " so'm";

  if (totalDebt === 0) {
    document.getElementById("paymentMessage").textContent =
      "✅ Qarzdorlik to‘liq yopildi!";
  } else {
    document.getElementById("paymentMessage").textContent =
      "✅ To‘lov qabul qilindi. Qolgan qarz: " +
      totalDebt.toLocaleString() +
      " so'm";
  }

  document.getElementById("payment").value = "";
}

</script>

</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`StudentUZ ${PORT}-portda ishlayapti`);
});
