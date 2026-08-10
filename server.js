const express = require("express");

const app = express();

app.use(express.json());

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
  padding: 22px;
  text-align: center;
}

.container {
  max-width: 1000px;
  margin: 25px auto;
  padding: 15px;
}

.card {
  background: white;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,.08);
}

input {
  width: 100%;
  padding: 12px;
  margin: 6px 0;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
}

button {
  border: 0;
  padding: 11px 16px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 8px;
}

.add {
  background: #2563eb;
  color: white;
}

.detail {
  background: #dbeafe;
  color: #1d4ed8;
}

.pay {
  background: #dcfce7;
  color: #166534;
}

.back {
  background: #e2e8f0;
  color: #334155;
}

.students {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.student {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,.08);
}

.student h3 {
  margin-top: 0;
}

.debt {
  color: #dc2626;
  font-weight: bold;
}

.paid {
  color: #16a34a;
  font-weight: bold;
}

.hidden {
  display: none;
}

.stat {
  padding: 15px;
  background: #f8fafc;
  border-radius: 10px;
  margin: 8px 0;
}
</style>
</head>

<body>

<header>
  <h1>🎓 StudentUZ</h1>
  <p>O‘quvchilar boshqaruv platformasi</p>
</header>

<div class="container">

  <!-- DASHBOARD -->
  <div id="dashboard">

    <div class="card">
      <h2>➕ O‘quvchi qo‘shish</h2>

      <input id="name" placeholder="O‘quvchi ismi">

      <input
        id="fee"
        type="number"
        placeholder="Oylik to‘lov"
      >

      <button class="add" onclick="addStudent()">
        O‘quvchi qo‘shish
      </button>

      <p id="message"></p>
    </div>

    <div class="card">
      <h2>👨‍🎓 O‘quvchilar</h2>

      <div id="students" class="students">
      </div>
    </div>

  </div>


  <!-- BATAFSIL -->
  <div id="details" class="hidden">

    <div class="card">

      <button class="back" onclick="showDashboard()">
        ← O‘quvchilar ro‘yxatiga qaytish
      </button>

      <h2 id="detailName"></h2>

      <div class="stat">
        💰 Oylik:
        <strong id="detailFee"></strong>
      </div>

      <div class="stat">
        ✅ To‘langan:
        <strong class="paid" id="detailPaid"></strong>
      </div>

      <div class="stat">
        🔴 Qarz:
        <strong class="debt" id="detailDebt"></strong>
      </div>

      <div class="stat">
        📅 Keldi:
        <strong id="detailCame"></strong> kun
      </div>

      <div class="stat">
        ❌ Kelmadi:
        <strong id="detailAbsent"></strong> kun
      </div>

      <hr>

      <h3>💳 To‘lov qilish</h3>

      <input
        id="payment"
        type="number"
        placeholder="To‘lov summasi"
      >

      <button class="pay" onclick="makePayment()">
        To‘lovni saqlash
      </button>

      <p id="paymentMessage"></p>

      <hr>

      <h3>📋 Davomat tarixi</h3>

      <div id="attendance"></div>

    </div>

  </div>

</div>


<script>

let students = [];

let selectedStudentId = null;


// O'quvchi qo'shish
function addStudent() {

  const name =
    document.getElementById("name").value.trim();

  const fee =
    Number(document.getElementById("fee").value);

  if (!name || !fee) {
    document.getElementById("message").textContent =
      "❌ Ism va oylik to‘lovni kiriting.";
    return;
  }

  const student = {
    id: Date.now(),

    name: name,

    fee: fee,

    paid: 0,

    came: 0,

    absent: 0,

    attendance: []
  };

  students.push(student);

  document.getElementById("name").value = "";
  document.getElementById("fee").value = "";

  document.getElementById("message").textContent =
    "✅ O‘quvchi qo‘shildi!";

  renderStudents();
}


// O'quvchilar ro'yxati
function renderStudents() {

  const container =
    document.getElementById("students");

  if (students.length === 0) {

    container.innerHTML =
      "<p>Hozircha o‘quvchilar yo‘q.</p>";

    return;
  }

  container.innerHTML = students.map(student => {

    const debt =
      Math.max(student.fee - student.paid, 0);

    return \`
      <div class="student">

        <h3>👤 \${student.name}</h3>

        <p>
          Oylik:
          <strong>
            \${student.fee.toLocaleString()} so‘m
          </strong>
        </p>

        <p>
          Qarz:
          <strong class="debt">
            \${debt.toLocaleString()} so‘m
          </strong>
        </p>

        <p>
          Keldi:
          \${student.came} kun
        </p>

        <p>
          Kelmadi:
          \${student.absent} kun
        </p>

        <button
          class="detail"
          onclick="showDetails(\${student.id})"
        >
          Batafsil →
        </button>

      </div>
    \`;

  }).join("");
}


// Batafsil sahifa
function showDetails(id) {

  const student =
    students.find(s => s.id === id);

  if (!student) return;

  selectedStudentId = id;

  document.getElementById("dashboard")
    .classList.add("hidden");

  document.getElementById("details")
    .classList.remove("hidden");

  document.getElementById("detailName")
    .textContent =
    "👤 " + student.name;

  updateDetails(student);
}


// Ma'lumotlarni yangilash
function updateDetails(student) {

  const debt =
    Math.max(student.fee - student.paid, 0);

  document.getElementById("detailFee")
    .textContent =
    student.fee.toLocaleString() + " so‘m";

  document.getElementById("detailPaid")
    .textContent =
    student.paid.toLocaleString() + " so‘m";

  document.getElementById("detailDebt")
    .textContent =
    debt.toLocaleString() + " so‘m";

  document.getElementById("detailCame")
    .textContent =
    student.came;

  document.getElementById("detailAbsent")
    .textContent =
    student.absent;

  const attendance =
    document.getElementById("attendance");

  if (student.attendance.length === 0) {

    attendance.innerHTML =
      "<p>Davomat tarixi hali yo‘q.</p>";

    return;
  }

  attendance.innerHTML =
    student.attendance.map(item => \`
      <div class="stat">
        \${item.date} —
        \${item.status === "keldi"
          ? "✅ Keldi"
          : "❌ Kelmadi"}
      </div>
    \`).join("");
}


// To'lov
function makePayment() {

  const student =
    students.find(s => s.id === selectedStudentId);

  if (!student) return;

  const amount =
    Number(document.getElementById("payment").value);

  if (!amount || amount <= 0) {

    document.getElementById("paymentMessage")
      .textContent =
      "❌ To‘lov summasini kiriting.";

    return;
  }

  student.paid += amount;

  if (student.paid > student.fee) {
    student.paid = student.fee;
  }

  document.getElementById("payment").value = "";

  const debt =
    Math.max(student.fee - student.paid, 0);

  if (debt === 0) {

    document.getElementById("paymentMessage")
      .textContent =
      "✅ Qarzdorlik to‘liq yopildi!";

  } else {

    document.getElementById("paymentMessage")
      .textContent =
      "✅ To‘lov saqlandi. Qolgan qarz: " +
      debt.toLocaleString() +
      " so‘m";
  }

  updateDetails(student);
  renderStudents();
}


// Dashboardga qaytish
function showDashboard() {

  document.getElementById("details")
    .classList.add("hidden");

  document.getElementById("dashboard")
    .classList.remove("hidden");

  selectedStudentId = null;
}

</script>

</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    \`StudentUZ server \${PORT}-portda ishlayapti\`
  );
});
