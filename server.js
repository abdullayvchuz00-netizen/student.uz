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

.menuButton {
  display: block;
  width: 100%;
  margin: 10px 0;
  text-align: left;
  font-size: 17px;
}

.reportBox {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.stat {
  background: #f8fafc;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
}

.stat strong {
  display: block;
  font-size: 20px;
  margin-top: 8px;
}

</style>
</head>

<body>

<header>
  <h1>🎓 StudentUZ</h1>
  <p>O‘quvchilar uchun platforma</p>
</header>

<div class="container">

  <!-- ASOSIY MENYU -->
  <div id="dashboard">

    <div class="card">

      <h2>📋 Asosiy menyu</h2>

      <button id="addMenuButton" class="add menuButton">
        ➕ O‘quvchi qo‘shish
      </button>

      <button id="studentsMenuButton" class="detail menuButton">
        👨‍🎓 O‘quvchilar
      </button>

      <button id="reportMenuButton" class="save menuButton">
        📊 Oylik hisobot
      </button>

      <button id="settingsMenuButton" class="back menuButton">
        ⚙️ Sozlamalar
      </button>

    </div>


    <!-- O‘QUVCHI QO‘SHISH -->
    <div id="addSection" class="card">

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


    <!-- O‘QUVCHILAR -->
    <div id="studentsSection" class="card">

      <h2>👨‍🎓 O‘quvchilar</h2>

      <div id="studentsList" class="students"></div>

    </div>


    <!-- KELGANLAR -->
    <div class="card">

      <h2>👥 Bugun kelganlar</h2>

      <div id="cameList"></div>

    </div>


    <!-- HISOBOT -->
    <div id="reportSection" class="card hidden">

      <h2>📊 Oylik hisobot</h2>

      <input
        id="reportMonth"
        type="month"
      >

      <button id="reportButton" class="save">
        📊 Hisobotni ko‘rsatish
      </button>

      <div id="reportResult"></div>

    </div>


    <!-- SOZLAMALAR -->
    <div id="settingsSection" class="card hidden">

      <h2>⚙️ Sozlamalar</h2>

      <p>Hozircha sozlamalar mavjud emas.</p>

      <button id="settingsBackButton" class="back">
        ← Orqaga
      </button>

    </div>

  </div>


  <!-- BATAFSIL -->
  <div id="details" class="hidden">

    <div class="card">

      <button id="backButton" class="back">
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

      <h3>💳 Qarz to‘lash</h3>

      <input
        id="paymentAmount"
        type="number"
        placeholder="To‘lanadigan summa"
      >

      <button id="payButton" class="pay">
        💳 Qarz to‘lash
      </button>

      <p id="paymentMessage"></p>

      <hr>

      <h3>🔴 Qarz qo‘yish</h3>

      <input
        id="debtAmount"
        type="number"
        placeholder="Qarz summasi"
      >

      <button id="debtButton" class="debtAdd">
        ➕ Qarz qo‘yish
      </button>

      <p id="debtMessage"></p>

      <hr>

      <h3>📅 Bugungi davomat</h3>

      <button id="cameButton" class="came">
        ✅ Bugun keldi
      </button>

      <button id="absentButton" class="absent">
        ❌ Bugun kelmadi
      </button>

      <p id="attendanceMessage"></p>

      <hr>

      <h3>✏️ Tahrirlash</h3>

      <input
        id="editName"
        type="text"
        placeholder="O‘quvchi ismi"
      >

      <input
        id="editFee"
        type="number"
        placeholder="Oylik to‘lov"
      >

      <button id="saveButton" class="save">
        💾 Saqlash
      </button>

      <p id="editMessage"></p>

    </div>

  </div>

</div>


<script>

let students = [];
let selectedStudentId = null;


// ELEMENTLAR

const addButton =
  document.getElementById("addButton");

const backButton =
  document.getElementById("backButton");

const saveButton =
  document.getElementById("saveButton");

const payButton =
  document.getElementById("payButton");

const debtButton =
  document.getElementById("debtButton");

const cameButton =
  document.getElementById("cameButton");

const absentButton =
  document.getElementById("absentButton");

const addMenuButton =
  document.getElementById("addMenuButton");

const studentsMenuButton =
  document.getElementById("studentsMenuButton");

const reportMenuButton =
  document.getElementById("reportMenuButton");

const settingsMenuButton =
  document.getElementById("settingsMenuButton");

const settingsBackButton =
  document.getElementById("settingsBackButton");

const reportButton =
  document.getElementById("reportButton");


// BO‘LIMLAR

const addSection =
  document.getElementById("addSection");

const studentsSection =
  document.getElementById("studentsSection");

const reportSection =
  document.getElementById("reportSection");

const settingsSection =
  document.getElementById("settingsSection");


// MENYU FUNKSIYALARI

addMenuButton.addEventListener("click", function() {

  addSection.classList.remove("hidden");

  studentsSection.classList.add("hidden");

  reportSection.classList.add("hidden");

  settingsSection.classList.add("hidden");

});


studentsMenuButton.addEventListener("click", function() {

  addSection.classList.add("hidden");

  studentsSection.classList.remove("hidden");

  reportSection.classList.add("hidden");

  settingsSection.classList.add("hidden");

});


reportMenuButton.addEventListener("click", function() {

  addSection.classList.add("hidden");

  studentsSection.classList.add("hidden");

  reportSection.classList.remove("hidden");

  settingsSection.classList.add("hidden");

});


settingsMenuButton.addEventListener("click", function() {

  addSection.classList.add("hidden");

  studentsSection.classList.add("hidden");

  reportSection.classList.add("hidden");

  settingsSection.classList.remove("hidden");

});


settingsBackButton.addEventListener("click", function() {

  settingsSection.classList.add("hidden");

  studentsSection.classList.remove("hidden");

});


// O‘QUVCHI QO‘SHISH

addButton.addEventListener("click", function() {

  const name =
    document
      .getElementById("studentName")
      .value
      .trim();

  const fee =
    Number(
      document
        .getElementById("studentFee")
        .value
    );

  const message =
    document.getElementById("addMessage");


  if (name === "") {

    message.className = "error";

    message.textContent =
      "❌ O‘quvchi ismini kiriting.";

    return;
  }


  if (fee <= 0) {

    message.className = "error";

    message.textContent =
      "❌ Oylik to‘lovni kiriting.";

    return;
  }


  const student = {

    id: Date.now(),

    name: name,

    fee: fee,

    paid: 0,

    extraDebt: 0,

    came: 0,

    absent: 0

  };


  students.push(student);


  document
    .getElementById("studentName")
    .value = "";

  document
    .getElementById("studentFee")
    .value = "";


  message.className = "success";

  message.textContent =
    "✅ " + name + " qo‘shildi!";


  renderStudents();

  renderCameList();

});


// UMUMIY QARZ

function getDebt(student) {

  return Math.max(
    student.fee -
    student.paid +
    student.extraDebt,
    0
  );

}


// O‘QUVCHILAR RO‘YXATI

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
      getDebt(student);


    const card =
      document.createElement("div");

    card.className = "student";


    const title =
      document.createElement("h3");

    title.textContent =
      "👤 " + student.name;


    const fee =
      document.createElement("p");

    fee.textContent =
      "💰 Oylik: " +
      student.fee.toLocaleString() +
      " so‘m";


    const paidText =
      document.createElement("p");

    paidText.innerHTML =
      "✅ To‘langan: <strong class='paid'>" +
      student.paid.toLocaleString() +
      " so‘m</strong>";


    const debtText =
      document.createElement("p");

    debtText.innerHTML =
      "🔴 Qarz: <strong class='debt'>" +
      debt.toLocaleString() +
      " so‘m</strong>";


    const came =
      document.createElement("p");

    came.textContent =
      "📅 Keldi: " +
      student.came +
      " kun";


    const absent =
      document.createElement("p");

    absent.textContent =
      "❌ Kelmadi: " +
      student.absent +
      " kun";


    const detailButton =
      document.createElement("button");

    detailButton.className = "detail";

    detailButton.textContent =
      "📋 Batafsil";


    detailButton.addEventListener(
      "click",
      function() {
        showDetails(student.id);
      }
    );


    const editButton =
      document.createElement("button");

    editButton.className = "edit";

    editButton.textContent =
      "✏️ Tahrirlash";


    editButton.addEventListener(
      "click",
      function() {
        showDetails(student.id);
      }
    );


    const deleteButton =
      document.createElement("button");

    deleteButton.className = "delete";

    deleteButton.textContent =
      "🗑️ O‘chirish";


    deleteButton.addEventListener(
      "click",
      function() {
        deleteStudent(student.id);
      }
    );


    card.appendChild(title);
    card.appendChild(fee);
    card.appendChild(paidText);
    card.appendChild(debtText);
    card.appendChild(came);
    card.appendChild(absent);
    card.appendChild(detailButton);
    card.appendChild(editButton);
    card.appendChild(deleteButton);


    list.appendChild(card);

  });

}


// BUGUN KELGANLAR

function renderCameList() {

  const list =
    document.getElementById("cameList");

  list.innerHTML = "";


  const cameStudents =
    students.filter(function(student) {

      return student.came > 0;

    });


  if (cameStudents.length === 0) {

    list.innerHTML =
      "<p>Bugun kelgan o‘quvchilar yo‘q.</p>";

    return;
  }


  cameStudents.forEach(function(student) {

    const item =
      document.createElement("p");

    item.textContent =
      "✅ " + student.name;

    list.appendChild(item);

  });

}


// BATAFSIL

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


// MA'LUMOTNI KO‘RSATISH

function updateDetails(student) {

  const debt =
    getDebt(student);


  document
    .getElementById("detailName")
    .textContent =
    "👤 " + student.name;


  document
    .getElementById("detailFee")
    .textContent =
    student.fee.toLocaleString() +
    " so‘m";


  document
    .getElementById("detailPaid")
    .textContent =
    student.paid.toLocaleString() +
    " so‘m";


  document
    .getElementById("detailDebt")
    .textContent =
    debt.toLocaleString() +
    " so‘m";


  document
    .getElementById("detailCame")
    .textContent =
    student.came;


  document
    .getElementById("detailAbsent")
    .textContent =
    student.absent;


  document
    .getElementById("editName")
    .value =
    student.name;


  document
    .getElementById("editFee")
    .value =
    student.fee;

}


// TAHRIRLASH

saveButton.addEventListener(
  "click",
  function() {

    const student =
      students.find(function(item) {

        return item.id === selectedStudentId;

      });


    if (!student) {

      return;

    }


    const newName =
      document
        .getElementById("editName")
        .value
        .trim();


    const newFee =
      Number(
        document
          .getElementById("editFee")
          .value
      );


    const message =
      document.getElementById("editMessage");


    if (
      newName === "" ||
      newFee <= 0
    ) {

      message.className = "error";

      message.textContent =
        "❌ Ma’lumotlarni to‘g‘ri kiriting.";

      return;

    }


    student.name = newName;

    student.fee = newFee;


    updateDetails(student);

    renderStudents();

    renderCameList();


    message.className = "success";

    message.textContent =
      "✅ Ma’lumotlar saqlandi!";

  }
);


// O‘CHIRISH

function deleteStudent(id) {

  const student =
    students.find(function(item) {

      return item.id === id;

    });


  if (!student) {

    return;

  }


  if (
    !confirm(
      student.name +
      "ni o‘chirishni xohlaysizmi?"
    )
  ) {

    return;

  }


  students =
    students.filter(function(item) {

      return item.id !== id;

    });


  renderStudents();

  renderCameList();

}


// ORQAGA

backButton.addEventListener(
  "click",
  function() {

    document
      .getElementById("details")
      .classList.add("hidden");


    document
      .getElementById("dashboard")
      .classList.remove("hidden");


    selectedStudentId = null;

  }
);


// QARZ TO‘LASH

payButton.addEventListener(
  "click",
  function() {

    const student =
      students.find(function(item) {

        return item.id === selectedStudentId;

      });


    if (!student) return;


    const amount =
      Number(
        document
          .getElementById("paymentAmount")
          .value
      );


    const message =
      document.getElementById("paymentMessage");


    const debt =
      getDebt(student);


    if (amount <= 0) {

      message.className = "error";

      message.textContent =
        "❌ To‘lov summasini kiriting.";

      return;

    }


    if (amount > debt) {

      message.className = "error";

      message.textContent =
        "❌ Qarzdan ko‘p to‘lab bo‘lmaydi.";

      return;

    }


    student.paid += amount;


    document
      .getElementById("paymentAmount")
      .value = "";


    message.className = "success";

    message.textContent =
      "✅ " +
      amount.toLocaleString() +
      " so‘m to‘landi!";


    updateDetails(student);

    renderStudents();

  }
);


// QARZ QO‘YISH

debtButton.addEventListener(
  "click",
  function() {

    const student =
      students.find(function(item) {

        return item.id === selectedStudentId;

      });


    if (!student) return;


    const amount =
      Number(
        document
          .getElementById("debtAmount")
          .value
      );


    const message =
      document.getElementById("debtMessage");


    if (amount <= 0) {

      message.className = "error";

      message.textContent =
        "❌ Qarz summasini kiriting.";

      return;

    }


    student.extraDebt += amount;


    document
      .getElementById("debtAmount")
      .value = "";


    message.className = "success";

    message.textContent =
      "🔴 " +
      amount.toLocaleString() +
      " so‘m qarz qo‘yildi!";


    updateDetails(student);

    renderStudents();

  }
);


// BUGUN KELDI

cameButton.addEventListener(
  "click",
  function() {

    const student =
      students.find(function(item) {

        return item.id === selectedStudentId;

      });


    if (!student) return;


    const message =
      document.getElementById("attendanceMessage");


    student.came++;


    message.className = "success";

    message.textContent =
      "✅ Bugun keldi deb belgilandi!";


    updateDetails(student);

    renderStudents();

    renderCameList();

  }
);


// BUGUN KELMADI

absentButton.addEventListener(
  "click",
  function() {

    const student =
      students.find(function(item) {

        return item.id === selectedStudentId;

      });


    if (!student) return;


    const message =
      document.getElementById("attendanceMessage");


    student.absent++;


    message.className = "error";

    message.textContent =
      "❌ Bugun kelmadi deb belgilandi!";


    updateDetails(student);

    renderStudents();

  }
);


// OYLIK HISOBOT

reportButton.addEventListener(
  "click",
  function() {

    const result =
      document.getElementById("reportResult");


    if (students.length === 0) {

      result.innerHTML =
        "<p>Hozircha o‘quvchilar yo‘q.</p>";

      return;

    }


    let totalPaid = 0;

    let totalDebt = 0;

    let totalCame = 0;

    let totalAbsent = 0;


    students.forEach(function(student) {

      totalPaid += student.paid;

      totalDebt += getDebt(student);

      totalCame += student.came;

      totalAbsent += student.absent;

    });


    let html = `

      <div class="reportBox">

        <div class="stat">
          💰 Jami to‘langan
          <strong>
            ${totalPaid.toLocaleString()} so‘m
          </strong>
        </div>

        <div class="stat">
          🔴 Jami qarz
          <strong>
            ${totalDebt.toLocaleString()} so‘m
          </strong>
        </div>

        <div class="stat">
          ✅ Jami kelgan
          <strong>
            ${totalCame} kun
          </strong>
        </div>

        <div class="stat">
          ❌ Jami kelmagan
          <strong>
            ${totalAbsent} kun
          </strong>
        </div>

      </div>

      <hr>

      <h3>👨‍🎓 O‘quvchilar bo‘yicha</h3>
    `;


    students.forEach(function(student) {

      html += `

        <div class="student">

          <h3>👤 ${student.name}</h3>

          <p>
            💰 To‘lagan:
            <strong class="paid">
              ${student.paid.toLocaleStr
