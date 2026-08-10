const express = require("express");

const app = express();

let students = [];
let attendance = {};

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
  max-width: 1100px;
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
  border: none;
  padding: 11px 15px;
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

.pay {
  background: #16a34a;
  color: white;
}

.come {
  background: #22c55e;
  color: white;
}

.absent {
  background: #ef4444;
  color: white;
}

.back {
  background: #e2e8f0;
  color: #334155;
}

.attendance {
  background: #7c3aed;
  color: white;
}

.students {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(270px, 1fr));
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

.status-card {
  padding: 15px;
  margin: 10px 0;
  border-radius: 12px;
  background: #f8fafc;
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

      <h2>📚 Boshqaruv</h2>

      <button id="attendancePage"
              class="attendance">
        📅 Bugungi davomat
      </button>

    </div>


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


    <div class="card">

      <h2>👨‍🎓 O‘quvchilar</h2>

      <div id="studentsList" class="students"></div>

    </div>

  </div>


  <!-- BATAFSIL -->

  <div id="details" class="hidden">

    <div class="card">

      <button id="backDetails"
              class="back">
        ← Orqaga
      </button>

      <h2 id="detailName"></h2>

      <p>
        💰 Oylik:
        <strong id="detailFee"></strong>
      </p>

      <p>
        ✅ To‘langan:
        <strong class="paid"
                id="detailPaid"></strong>
      </p>

      <p>
        🔴 Qarz:
        <strong class="debt"
                id="detailDebt"></strong>
      </p>

      <p>
        📅 Keldi:
        <strong id="detailCame"></strong>
        kun
      </p>

      <p>
        ❌ Kelmadi:
        <strong id="detailAbsent"></strong>
        kun
      </p>

      <hr>

      <h3>💳 Qarz to‘lash</h3>

      <input
        id="paymentAmount"
        type="number"
        placeholder="To‘lov summasi"
      >

      <button id="paymentButton"
              class="pay">
        💳 To‘lovni saqlash
      </button>

      <p id="paymentMessage"></p>

      <hr>

      <h3>📅 Bugungi davomat</h3>

      <button id="cameButton"
              class="come">
        ✅ Bugun keldi
      </button>

      <button id="absentButton"
              class="absent">
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

      <button id="saveButton"
              class="save">
        💾 Saqlash
      </button>

      <p id="editMessage"></p>

      <hr>

      <button id="deleteFromDetails"
              class="delete">
        🗑️ O‘quvchini o‘chirish
      </button>

    </div>

  </div>


  <!-- DAVOMAT -->

  <div id="attendancePageView"
       class="hidden">

    <div class="card">

      <button id="backAttendance"
              class="back">
        ← Orqaga
      </button>

      <h2>📅 Bugungi davomat</h2>

      <p>
        Bugun:
        <strong id="today"></strong>
      </p>

    </div>


    <div class="card">

      <h2>🟢 Bugun kelganlar</h2>

      <div id="cameList"></div>

    </div>


    <div class="card">

      <h2>🔴 Bugun kelmaganlar</h2>

      <div id="absentList"></div>

    </div>

  </div>

</div>


<script>

let selectedStudentId = null;


// ELEMENTLAR

const addButton =
  document.getElementById("addButton");

const saveButton =
  document.getElementById("saveButton");

const paymentButton =
  document.getElementById("paymentButton");

const cameButton =
  document.getElementById("cameButton");

const absentButton =
  document.getElementById("absentButton");


// BUGUNGI SANA

function getToday() {

  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(now.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(now.getDate())
      .padStart(2, "0");

  return year + "-" + month + "-" + day;
}


document
  .getElementById("today")
  .textContent = getToday();


// O‘QUVCHI QO‘SHISH

addButton.addEventListener(
  "click",
  function() {

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
      document
        .getElementById("addMessage");


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


    message.className =
      "success";

    message.textContent =
      "✅ " + name + " qo‘shildi!";


    renderStudents();

  }
);


// RO‘YXAT

function renderStudents() {

  const list =
    document
      .getElementById("studentsList");

  list.innerHTML = "";


  if (students.length === 0) {

    list.innerHTML =
      "<p>Hozircha o‘quvchilar yo‘q.</p>";

    return;
  }


  students.forEach(
    function(student) {

      const debt =
        Math.max(
          student.fee -
          student.paid,
          0
        );


      const card =
        document.createElement("div");

      card.className =
        "student";


      const title =
        document.createElement("h3");

      title.textContent =
        "👤 " + student.name;


      const fee =
        document.createElement("p");

      fee.textContent =
        "💰 Oylik: " +
        student.fee
          .toLocaleString() +
        " so‘m";


      const debtText =
        document.createElement("p");

      debtText.innerHTML =
        "🔴 Qarz: " +
        "<strong class='debt'>" +
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

      detailButton.className =
        "detail";

      detailButton.textContent =
        "📋 Batafsil";


      detailButton.addEventListener(
        "click",
        function() {
          showDetails(student.id);
        }
      );


      card.appendChild(title);
      card.appendChild(fee);
      card.appendChild(debtText);
      card.appendChild(came);
      card.appendChild(absent);
      card.appendChild(detailButton);


      list.appendChild(card);

    }
  );

}


// BATAFSIL

function showDetails(id) {

  const student =
    students.find(
      function(item) {
        return item.id === id;
      }
    );


  if (!student) {
    return;
  }


  selectedStudentId =
    id;


  document
    .getElementById("dashboard")
    .classList.add("hidden");


  document
    .getElementById("attendancePageView")
    .classList.add("hidden");


  document
    .getElementById("details")
    .classList.remove("hidden");


  updateDetails(student);

}


// BATAFSIL MA'LUMOT

function updateDetails(student) {

  const debt =
    Math.max(
      student.fee -
      student.paid,
      0
    );


  document
    .getElementById("detailName")
    .textContent =
    "👤 " + student.name;


  document
    .getElementById("detailFee")
    .textContent =
    student.fee
      .toLocaleString() +
    " so‘m";


  document
    .getElementById("detailPaid")
    .textContent =
    student.paid
      .toLocaleString() +
    " so‘m";


  document
    .getElementById("detailDebt")
    .textContent =
    debt
      .toLocaleString() +
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


// TO‘LOV

paymentButton.addEventListener(
  "click",
  function() {

    const student =
      students.find(
        function(item) {
          return item.id ===
            selectedStudentId;
        }
      );


    if (!student) {
      return;
    }


    const amount =
      Number(
        document
          .getElementById(
            "paymentAmount"
          )
          .value
      );


    const message =
      document
        .getElementById(
          "paymentMessage"
        );


    if (amount <= 0) {

      message.className =
        "error";

      message.textContent =
        "❌ To‘lov summasini kiriting.";

      return;
    }


    student.paid += amount;


    document
      .getElementById(
        "paymentAmount"
      )
      .value = "";


    updateDetails(student);

    renderStudents();


    message.className =
      "success";

    message.textContent =
      "✅ To‘lov saqlandi!";

  }
);


// KELDI

cameButton.addEventListener(
  "click",
  function() {

    markAttendance("came");

  }
);


// KELMADI

absentButton.addEventListener(
  "click",
  function() {

    markAttendance("absent");

  }
);


// DAVOMAT BELGILASH

function markAttendance(status) {

  const student =
    students.find(
      function(item) {
        return item.id ===
          selectedStudentId;
      }
    );


  if (!student) {
    return;
  }


  const today =
    getToday();


  if (!attendance[student.id]) {

    attendance[student.id] = {};

  }


  if (
    attendance[student.id][today]
  ) {

    alert(
      "Bugungi davomat allaqachon belgilangan."
    );

    return;
  }


  attendance[student.id][today] =
    status;


  if (status === "came") {

    student.came++;

  } else {

    student.absent++;

  }


  updateDetails(student);

  renderStudents();

  renderAttendance();


  document
    .getElementById(
      "attendanceMessage"
    )
    .textContent =
    status === "came"
      ? "✅ Bugun keldi deb belgilandi!"
      : "❌ Bugun kelmadi deb belgilandi!";

}


// DAVOMAT SAHIFASI

document
  .getElementById(
    "attendancePage"
  )
  .addEventListener(
    "click",
    function() {

      document
        .getElementById(
          "dashboard"
        )
        .classList.add("hidden");


      document
        .getElementById(
          "details"
        )
        .classList.add("hidden");


      document
        .getElementById(
          "attendancePageView"
        )
        .classList.remove("hidden");


      renderAttendance();

    }
  );


// DAVOMAT RO‘YXATI

function renderAttendance() {

  const cameList =
    document.getElementById(
      "cameList"
    );

  const absentList =
    document.getElementById(
      "absentList"
    );


  cameList.innerHTML = "";

  absentList.innerHTML = "";


  let cameCount = 0;

  let absentCount = 0;


  students.forEach(
    function(student) {

      const status =
        attendance[student.id] &&
        attendance[student.id][getToday()];


      if (status === "came") {

        cameCount++;

        const item =
          document.createElement("div");

        item.className =
          "status-card";

        item.textContent =
          "🟢 " + student.name;

        cameList.appendChild(item);

      }


      if (status === "absent") {

        absentCount++;

        const item =
          document.createElement("div");

        item.className =
          "status-card";

        item.textContent =
          "🔴 " + student.name;

        absentList.appendChild(item);

      }

    }
  );


  if (cameCount === 0) {

    cameList.innerHTML =
      "<p>Bugun kelganlar yo‘q.</p>";

  }


  if (absentCount === 0) {

    absentList.innerHTML =
      "<p>Bugun kelmaganlar yo‘q.</p>";

  }

}


// TAHRIRLASH

saveButton.addEventListener(
  "click",
  function() {

    const student =
      students.find(
        function(item) {
          return item.id ===
            selectedStudentId;
        }
      );


    if (!student) {
      return;
    }


    const name =
      document
        .getElementById("editName")
        .value
        .trim();


    const fee =
      Number(
        document
          .getElementById("editFee")
          .value
      );


    if (
      name === "" ||
      fee <= 0
    ) {

      document
        .getElementById(
          "editMessage"
        )
        .textContent =
        "❌ Ma’lumotlarni to‘g‘ri kiriting.";

      return;
    }


    student.name =
      name;

    student.fee =
      fee;


    updateDetails(student);

    renderStudents();


    document
      .getElementById(
        "editMessage"
      )
      .textContent =
      "✅ Saqlandi!";

  }
);


// O‘CHIRISH

document
  .getElementById(
    "deleteFromDetails"
  )
  .addEventListener(
    "click",
    function() {

      const student =
        students.find(
          function(item) {
            return item.id ===
              selectedStudentId;
          }
        );


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
        students.filter(
          function(item) {
            return item.id !==
              selectedStudentId;
          }
        );


      delete attendance[
        selectedStudentId
      ];


      document
        .getElementById(
          "details"
        )
        .classList.add("hidden");


      document
        .getElementById(
          "dashboard"
        )
        .classList.remove("hidden");


      selectedStudentId =
        null;


      renderStudents();

    }
  );


// ORQAGA

document
  .getElementById(
    "backDetails"
  )
  .addEventListener(
    "click",
    function() {

      document
        .getElementById(
          "details"
        )
        .classList.add("hidden");


      document
        .getElementById(
          "dashboard"
        )
        .classList.remove("hidden");


      selectedStudentId =
        null;

    }
  );


document
  .getElementById(
    "backAttendance"
  )
  .addEventListener(
    "click",
    function() {

      document
        .getElementById(
          "attendancePageView"
        )
        .classList.add("hidden");


      document
        .getElementById(
          "dashboard"
        )
        .classList.remove("hidden");

    }
  );


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
