const express = require("express");

const app = express();

let students = [];

// Bosh sahifa
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

    header h1 {
      margin: 0 0 8px;
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
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }

    input {
      width: 100%;
      padding: 13px;
      margin: 6px 0;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 16px;
    }

    button {
      border: none;
      padding: 11px 16px;
      margin: 5px 3px 0 0;
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

    .back {
      background: #e2e8f0;
      color: #334155;
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

    .success {
      color: #16a34a;
      font-weight: bold;
    }

    .error {
      color: #dc2626;
      font-weight: bold;
    }
  </style>
</head>

<body>

<header>
  <h1>🎓 StudentUZ</h1>
  <p>O‘quvchilar uchun platforma</p>
</header>

<div class="container">

  <!-- DASHBOARD -->
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

      <button class="add" onclick="addStudent()">
        ➕ Qo‘shish
      </button>

      <p id="addMessage"></p>
    </div>


    <div class="card">
      <h2>👨‍🎓 O‘quvchilar</h2>

      <div id="studentsList" class="students"></div>
    </div>

  </div>


  <!-- BATAFSIL -->
  <div id="details" class="hidden">

    <div class="card">

      <button class="back" onclick="backToStudents()">
        ← O‘quvchilar
      </button>

      <h2 id="detailName"></h2>

      <p>
        💰 Oylik:
        <strong id="detailFee"></strong>
      </p>

      <p>
        ✅ To‘langan:
        <strong class="paid" id="detailPaid"></strong>
      </p>

      <p>
        🔴 Qarz:
        <strong class="debt" id="detailDebt"></strong>
      </p>

      <p>
        📅 Keldi:
        <strong id="detailCame"></strong> kun
      </p>

      <p>
        ❌ Kelmadi:
        <strong id="detailAbsent"></strong> kun
      </p>

      <hr>

      <h3>✏️ O‘quvchini tahrirlash</h3>

      <input
        id="editName"
        type="text"
        placeholder="Ism"
      >

      <input
        id="editFee"
        type="number"
        placeholder="Oylik to‘lov"
      >

      <button class="save" onclick="saveStudent()">
        💾 Saqlash
      </button>

      <p id="editMessage"></p>

    </div>

  </div>

</div>


<script>

let selectedStudentId = null;


// O‘quvchi qo‘shish
function addStudent() {

  const name =
    document.getElementById("studentName").value.trim();

  const fee =
    Number(document.getElementById("studentFee").value);

  const message =
    document.getElementById("addMessage");

  if (name === "" || fee <= 0) {

    message.className = "error";
    message.textContent =
      "❌ Ism va oylik to‘lovni kiriting.";

    return;
  }

  const student = {

    id: Date.now(),

    name: name,

    fee: fee,

    paid: 0,

    came: 0,

    absent: 0

  };

  students.push(student);

  document.getElementById("studentName").value = "";
  document.getElementById("studentFee").value = "";

  message.className = "success";
  message.textContent =
    "✅ " + name + " qo‘shildi!";

  renderStudents();
}


// O‘quvchilar ro‘yxati
function renderStudents() {

  const list =
    document.getElementById("studentsList");

  list.innerHTML = "";

  if (students.length === 0) {

    list.innerHTML =
      "<p>Hozircha o‘quvchilar yo‘q.</p>";

    return;
  }

  students.forEach(function(student) {

    const debt =
      Math.max(student.fee - student.paid, 0);

    const card =
      document.createElement("div");

    card.className = "student";

    card.innerHTML =
      "<h3>👤 " +
      escapeHtml(student.name) +
      "</h3>" +

      "<p>💰 Oylik: <strong>" +
      student.fee.toLocaleString() +
      " so‘m</strong></p>" +

      "<p>🔴 Qarz: <strong class='debt'>" +
      debt.toLocaleString() +
      " so‘m</strong></p>" +

      "<p>📅 Keldi: " +
      student.came +
      " kun</p>" +

      "<p>❌ Kelmadi: " +
      student.absent +
      " kun</p>" +

      "<button class='detail' onclick='showDetails(" +
      student.id +
      ")'>📋 Batafsil</button>" +

      "<button class='edit' onclick='showDetails(" +
      student.id +
      ")'>✏️ Tahrirlash</button>" +

      "<button class='delete' onclick='deleteStudent(" +
      student.id +
      ")'>🗑️ O‘chirish</button>";

    list.appendChild(card);
  });
}


// Batafsil sahifa
function showDetails(id) {

  const student =
    students.find(function(item) {
      return item.id === id;
    });

  if (!student) {
    return;
  }

  selectedStudentId = id;

  document
    .getElementById("dashboard")
    .classList.add("hidden");

  document
    .getElementById("details")
    .classList.remove("hidden");

  updateDetails(student);
}


// Batafsil ma’lumotni chiqarish
function updateDetails(student) {

  const debt =
    Math.max(student.fee - student.paid, 0);

  document.getElementById("detailName")
    .textContent =
    "👤 " + student.name;

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

  document.getElementById("editName").value =
    student.name;

  document.getElementById("editFee").value =
    student.fee;
}


// Tahrirlashni saqlash
function saveStudent() {

  const student =
    students.find(function(item) {
      return item.id === selectedStudentId;
    });

  if (!student) {
    return;
  }

  const name =
    document.getElementById("editName")
      .value
      .trim();

  const fee =
    Number(
      document.getElementById("editFee").value
    );

  const message =
    document.getElementById("editMessage");

  if (name === "" || fee <= 0) {

    message.className = "error";

    message.textContent =
      "❌ Ma’lumotlarni to‘g‘ri kiriting.";

    return;
  }

  student.name = name;
  student.fee = fee;

  updateDetails(student);
  renderStudents();

  message.className = "success";

  message.textContent =
    "✅ Ma’lumotlar saqlandi!";
}


// O‘quvchini o‘chirish
function deleteStudent(id) {

  const student =
    students.find(function(item) {
      return item.id === id;
    });

  if (!student) {
    return;
  }

  const result =
    confirm(
      student.name +
      "ni o‘chirishni xohlaysizmi?"
    );

  if (!result) {
    return;
  }

  students =
    students.filter(function(item) {
      return item.id !== id;
    });

  renderStudents();
}


// Orqaga qaytish
function backToStudents() {

  document
    .getElementById("details")
    .classList.add("hidden");

  document
    .getElementById("dashboard")
    .classList.remove("hidden");

  selectedStudentId = null;
}


// Xavfsiz HTML
function escapeHtml(text) {

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


renderStudents();

</script>

</body>
</html>
  `);
});


const PORT =
  process.env.PORT || 3000;

app.listen(
  PORT,
  "0.0.0.0",
  function() {

    console.log(
      "StudentUZ server " +
      PORT +
      "-portda ishlayapti"
    );

  }
);
