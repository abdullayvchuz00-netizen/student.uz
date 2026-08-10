const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let students = [];
let attendance = {};

function today() {
  const d = new Date();

  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

function getStudent(id) {
  return students.find(
    (student) => student.id === Number(id)
  );
}


/* =========================
   O‘QUVCHI QO‘SHISH
========================= */

app.post("/api/students", (req, res) => {
  const name = String(req.body.name || "").trim();
  const fee = Number(req.body.fee);

  if (!name || fee <= 0) {
    return res.status(400).json({
      message: "Ism va oylikni kiriting."
    });
  }

  const student = {
    id: Date.now(),
    name,
    fee,
    paid: 0,
    came: 0,
    absent: 0
  };

  students.push(student);

  res.json({
    message: "O‘quvchi qo‘shildi!",
    student
  });
});


/* =========================
   O‘QUVCHILAR
========================= */

app.get("/api/students", (req, res) => {
  res.json(students);
});


/* =========================
   TAHRIRLASH
========================= */

app.put("/api/students/:id", (req, res) => {
  const student = getStudent(req.params.id);

  if (!student) {
    return res.status(404).json({
      message: "O‘quvchi topilmadi."
    });
  }

  const name = String(req.body.name || "").trim();
  const fee = Number(req.body.fee);

  if (!name || fee <= 0) {
    return res.status(400).json({
      message: "Ma’lumotlarni to‘g‘ri kiriting."
    });
  }

  student.name = name;
  student.fee = fee;

  res.json({
    message: "Ma’lumotlar saqlandi!",
    student
  });
});


/* =========================
   O‘CHIRISH
========================= */

app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.filter(
    (student) => student.id !== id
  );

  delete attendance[id];

  res.json({
    message: "O‘quvchi o‘chirildi!"
  });
});


/* =========================
   QARZ TO‘LASH
========================= */

app.post("/api/students/:id/payment", (req, res) => {
  const student = getStudent(req.params.id);

  if (!student) {
    return res.status(404).json({
      message: "O‘quvchi topilmadi."
    });
  }

  const amount = Number(req.body.amount);

  if (amount <= 0) {
    return res.status(400).json({
      message: "To‘lov summasini kiriting."
    });
  }

  const debt = Math.max(
    student.fee - student.paid,
    0
  );

  if (amount > debt) {
    return res.status(400).json({
      message:
        "Qarzdan ko‘p to‘lov kiritildi."
    });
  }

  student.paid += amount;

  res.json({
    message: "To‘lov saqlandi!",
    student
  });
});


/* =========================
   DAVOMAT
========================= */

app.post(
  "/api/students/:id/attendance",
  (req, res) => {

    const student =
      getStudent(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "O‘quvchi topilmadi."
      });
    }

    const status = req.body.status;

    if (
      status !== "came" &&
      status !== "absent"
    ) {
      return res.status(400).json({
        message: "Davomat xatosi."
      });
    }

    const date = today();

    if (!attendance[student.id]) {
      attendance[student.id] = {};
    }

    if (attendance[student.id][date]) {
      return res.status(400).json({
        message:
          "Bugungi davomat allaqachon belgilangan."
      });
    }

    attendance[student.id][date] =
      status;

    if (status === "came") {
      student.came++;
    } else {
      student.absent++;
    }

    res.json({
      message:
        status === "came"
          ? "Bugun keldi!"
          : "Bugun kelmadi!",
      student
    });
  }
);


/* =========================
   BUGUNGI DAVOMAT
========================= */

app.get(
  "/api/attendance/today",
  (req, res) => {

    const date = today();

    const came = [];
    const absent = [];

    students.forEach((student) => {

      const status =
        attendance[student.id]?.[date];

      if (status === "came") {
        came.push(student);
      }

      if (status === "absent") {
        absent.push(student);
      }

    });

    res.json({
      date,
      came,
      absent
    });
  }
);


/* =========================
   SAYT
========================= */

app.get("/", (req, res) => {

  res.send(`

<!DOCTYPE html>

<html lang="uz">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

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
  margin: auto;
  padding: 20px;
}

.card {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow:
    0 5px 20px rgba(0,0,0,.08);
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
  padding: 11px 15px;
  margin: 5px 3px;
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

.pay {
  background: #16a34a;
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

.save {
  background: #f59e0b;
  color: white;
}

.delete {
  background: #dc2626;
  color: white;
}

.attendance {
  background: #7c3aed;
  color: white;
}

.back {
  background: #e2e8f0;
}

.hidden {
  display: none;
}

.students {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
}

.student {
  background: #f8fafc;
  padding: 18px;
  border-radius: 15px;
  border: 1px solid #e2e8f0;
}

.paid {
  color: #16a34a;
  font-weight: bold;
}

.debt {
  color: #dc2626;
  font-weight: bold;
}

.success {
  color: #16a34a;
}

.error {
  color: #dc2626;
}

.status {
  background: #f8fafc;
  padding: 14px;
  margin: 8px 0;
  border-radius: 10px;
}

</style>

</head>

<body>

<header>

<h1>🎓 StudentUZ</h1>

<p>O‘quvchilar uchun platforma</p>

</header>


<div class="container">


<!-- BOSH SAHIFA -->

<section id="home">

<div class="card">

<h2>➕ O‘quvchi qo‘shish</h2>

<input
  id="name"
  placeholder="O‘quvchi ismi"
>

<input
  id="fee"
  type="number"
  placeholder="Oylik to‘lov"
>

<button
  id="addBtn"
  class="add"
>
➕ Qo‘shish
</button>

<p id="addMessage"></p>

</div>


<div class="card">

<button
  id="attendanceBtn"
  class="attendance"
>
📅 Bugungi davomat
</button>

</div>


<div class="card">

<h2>👨‍🎓 O‘quvchilar</h2>

<div
  id="students"
  class="students"
></div>

</div>

</section>


<!-- BATAFSIL -->

<section
  id="detail"
  class="hidden"
>

<div class="card">

<button
  id="backBtn"
  class="back"
>
← Orqaga
</button>

<h2 id="detailName"></h2>

<p>
💰 Oylik:
<strong id="detailFee"></strong>
</p>

<p>
✅ To‘langan:
<strong
  id="detailPaid"
  class="paid"
></strong>
</p>

<p>
🔴 Qarz:
<strong
  id="detailDebt"
  class="debt"
></strong>
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
  id="payment"
  type="number"
  placeholder="To‘lov summasi"
>

<button
  id="payBtn"
  class="pay"
>
💳 Qarzni to‘lash
</button>

<p id="payMessage"></p>


<hr>


<h3>📅 Bugungi davomat</h3>

<button
  id="cameBtn"
  class="came"
>
✅ Bugun keldi
</button>

<button
  id="absentBtn"
  class="absent"
>
❌ Bugun kelmadi
</button>

<p id="attendanceMessage"></p>


<hr>


<h3>✏️ Tahrirlash</h3>

<input id="editName">

<input
  id="editFee"
  type="number"
>

<button
  id="saveBtn"
  class="save"
>
💾 Saqlash
</button>

<p id="editMessage"></p>


<hr>

<button
  id="deleteBtn"
  class="delete"
>
🗑️ O‘chirish
</button>

</div>

</section>


<!-- DAVOMAT -->

<section
  id="attendancePage"
  class="hidden"
>

<div class="card">

<button
  id="backAttendance"
  class="back"
>
← Orqaga
</button>

<h2>📅 Bugungi davomat</h2>

<p id="date"></p>

</div>


<div class="card">

<h2>🟢 Keganlar</h2>

<div id="cameList"></div>

</div>


<div class="card">

<h2>🔴 Kelmagnlar</h2>

<div id="absentList"></div>

</div>

</section>


</div>


<script>

let selectedId = null;


function money(value) {

  return Number(value)
    .toLocaleString("uz-UZ") +
    " so‘m";

}


/* O‘QUVCHILAR */

async function loadStudents() {

  const response =
    await fetch("/api/students");

  const students =
    await response.json();

  renderStudents(students);
}


function renderStudents(students) {

  const box =
    document.getElementById(
      "students"
    );

  box.innerHTML = "";


  if (students.length === 0) {

    box.innerHTML =
      "<p>Hozircha o‘quvchilar yo‘q.</p>";

    return;
  }


  students.forEach((student) => {

    const debt =
      Math.max(
        student.fee -
        student.paid,
        0
      );


    const card =
      document.createElement(
        "div"
      );

    card.className =
      "student";


    card.innerHTML = `

      <h3>
        👤 ${student.name}
      </h3>

      <p>
        💰 Oylik:
        ${money(student.fee)}
      </p>

      <p>
        ✅ To‘langan:
        <strong class="paid">
          ${money(student.paid)}
        </strong>
      </p>

      <p>
        🔴 Qarz:
        <strong class="debt">
          ${money(debt)}
        </strong>
      </p>

      <p>
        📅 Keldi:
        ${student.came} kun
      </p>

      <p>
        ❌ Kelmadi:
        ${student.absent} kun
      </p>

      <button
        class="detail"
      >
        📋 Batafsil
      </button>

    `;


    card
      .querySelector(".detail")
      .addEventListener(
        "click",
        () => showDetail(student.id)
      );


    box.appendChild(card);

  });

}


/* QO‘SHISH */

document
  .getElementById("addBtn")
  .addEventListener(
    "click",
    async () => {

      const name =
        document
          .getElementById("name")
          .value
          .trim();

      const fee =
        Number(
          document
            .getElementById("fee")
            .value
        );


      const message =
        document.getElementById(
          "addMessage"
        );


      if (!name || fee <= 0) {

        message.className =
          "error";

        message.textContent =
          "❌ Ma’lumotlarni kiriting.";

        return;
      }


      const response =
        await fetch(
          "/api/students",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              name,
              fee
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        message.className =
          "error";

        message.textContent =
          "❌ " +
          data.message;

        return;
      }


      document
        .getElementById("name")
        .value = "";

      document
        .getElementById("fee")
        .value = "";


      message.className =
        "success";

      message.textContent =
        "✅ O‘quvchi qo‘shildi!";


      loadStudents();

    }
  );


/* BATAFSIL */

async function showDetail(id) {

  const response =
    await fetch("/api/students");

  const students =
    await response.json();

  const student =
    students.find(
      (item) =>
        item.id === id
    );


  if (!student) {
    return;
  }


  selectedId = id;


  document
    .getElementById("home")
    .classList.add("hidden");


  document
    .getElementById("detail")
    .classList.remove("hidden");


  updateDetail(student);

}


function updateDetail(student) {

  const debt =
    Math.max(
      student.fee -
      student.paid,
      0
    );


  document
    .getElementById(
      "detailName"
    )
    .textContent =
    "👤 " + student.name;


  document
    .getElementById(
      "detailFee"
    )
    .textContent =
    money(student.fee);


  document
    .getElementById(
      "detailPaid"
    )
    .textContent =
    money(student.paid);


  document
    .getElementById(
      "detailDebt"
    )
    .textContent =
    money(debt);


  document
    .getElementById(
      "detailCame"
    )
    .textContent =
    student.came;


  document
    .getElementById(
      "detailAbsent"
    )
    .textContent =
    student.absent;


  document
    .getElementById(
      "editName"
    )
    .value =
    student.name;


  document
    .getElementById(
      "editFee"
    )
    .value =
    student.fee;

}


/* TO‘LOV */

document
  .getElementById("payBtn")
  .addEventListener(
    "click",
    async () => {

      const amount =
        Number(
          document
            .getElementById(
              "payment"
            )
            .value
        );


      const message =
        document.getElementById(
          "payMessage"
        );


      if (amount <= 0) {

        message.className =
          "error";

        message.textContent =
          "❌ To‘lov summasini kiriting.";

        return;
      }


      const response =
        await fetch(
          "/api/students/" +
          selectedId +
          "/payment",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              amount
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        message.className =
          "error";

        message.textContent =
          "❌ " +
          data.message;

        return;
      }


      message.className =
        "success";

      message.textContent =
        "✅ To‘lov saqlandi!";


      document
        .getElementById(
          "payment"
        )
        .value = "";


      updateDetail(
        data.student
      );

      loadStudents();

    }
  );


/* DAVOMAT */

async function attendance(status) {

  const response =
    await fetch(
      "/api/students/" +
      selectedId +
      "/attendance",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          status
        })
      }
    );


  const data =
    await response.json();


  const message =
    document.getElementById(
      "attendanceMessage"
    );


  if (!response.ok) {

    message.className =
      "error";

    message.textContent =
      "❌ " +
      data.message;

    return;
  }


  message.className =
    "success";

  message.textContent =
    "✅ " +
    data.message;


  updateDetail(
    data.student
  );

  loadStudents();

}


document
  .getElementById(
    "cameBtn"
  )
  .addEventListener(
    "click",
    () => attendance("came")
  );


document
  .getElementById(
    "absentBtn"
  )
  .addEventListener(
    "click",
    () => attendance("absent")
  );


/* TAHRIRLASH */

document
  .getElementById(
    "saveBtn"
  )
  .addEventListener(
    "click",
    async () => {

      const name =
        document
          .getElementById(
            "editName"
          )
          .value
          .trim();

      const fee =
        Number(
          document
            .getElementById(
              "editFee"
            )
            .value
        );


      const message =
        document.getElementById(
          "editMessage"
        );


      const response =
        await fetch(
          "/api/students/" +
          selectedId,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              name,
              fee
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        message.className =
          "error";

        message.textContent =
          "❌ " +
          data.message;

        return;
      }


      message.className =
        "success";

      message.textContent =
        "✅ Ma’lumotlar saqlandi!";


      updateDetail(
        data.student
      );

      loadStudents();

    }
  );


/* O‘CHIRISH */

document
  .getElementById(
    "deleteBtn"
  )
  .addEventListener(
    "click",
    async () => {

      const name =
        document
          .getElementById(
            "detailName"
          )
          .textContent;


      if (
        !confirm(
          name +
          "ni o‘chirishni xohlaysizmi?"
        )
      ) {
        return;
      }


      const response =
        await fetch(
          "/api/students/" +
          selectedId,
          {
            method: "DELETE"
          }
        );


      if (!response.ok) {

        alert(
          "O‘chirishda xato."
        );

        return;
      }


      selectedId = null;


      document
        .getElementById(
          "detail"
        )
        .classList.add(
          "hidden"
        );


      document
        .getElementById(
          "home"
        )
        .classList.remove(
          "hidden"
        );


      loadStudents();

    }
  );


/* DAVOMAT SAHIFASI */

document
  .getElementById(
    "attendanceBtn"
  )
  .addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "home"
        )
        .classList.add(
          "hidden"
        );


      document
        .getElementById(
          "attendancePage"
        )
        .classList.remove(
          "hidden"
        );


      loadAttendance();

    }
  );


/* DAVOMAT RO‘YXATI */

async function loadAttendance() {

  const response =
    await fetch(
      "/api/attendance/today"
    );

  const data =
    await response.json();


  document
    .getElementById(
      "date"
    )
    .textContent =
    "📅 " + data.date;


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


  if (data.came.length === 0) {

    cameList.innerHTML =
      "<p>Bugun kelganlar yo‘q.</p>";

  } else {

    data.came.forEach(
      (student) => {

        const div =
          document.createElement(
            "div"
          );

        div.className =
          "status";

        div.textContent =
          "🟢 " +
          student.name;

        cameList.appendChild(div);

      }
    );

  }


  if (data.absent.length === 0) {

    absentList.innerHTML =
      "<p>Bugun kelmaganlar yo‘q.</p>";

  } else {

    data.absent.forEach(
      (student) => {

        const div =
          document.createElement(
            "div"
          );

        div.className =
          "status";

        div.textContent =
          "🔴 " +
          student.name;

        absentList.appendChild(div);

      }
    );

  }

}


/* ORQAGA */

document
  .getElementById(
    "backBtn"
  )
  .addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "detail"
        )
        .classList.add(
          "hidden"
        );


      document
        .getElementById(
          "home"
        )
        .classList.remove(
          "hidden"
        );


      selectedId = null;

    }
  );


document
  .getElementById(
    "backAttendance"
  )
  .addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "attendancePage"
        )
        .classList.add(
          "hidden"
        );


      document
        .getElementById(
          "home"
        )
        .classList.remove(
          
