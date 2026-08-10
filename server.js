const express = require("express");

const app = express();

let students = [];

app.get("/", (req, res) => {
res.send(`

<!DOCTYPE html>  <html lang="uz">  
<head>  
<meta charset="UTF-8">  
<meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>StudentUZ</title>  <style>  
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
  grid-template-columns:  
    repeat(auto-fit, minmax(260px, 1fr));  
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
#welcomeScreen {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: white;
  text-align: center;
}

.welcomeLogo {
  font-size: 70px;
  animation: logoShow 1s ease;
}

#welcomeScreen h1 {
  margin: 10px 0 5px;
  font-size: 42px;
  animation: textShow 1s ease;
}

.logoLine {
  width: 0;
  height: 4px;
  background: white;
  border-radius: 10px;

  animation: lineShow 1.2s ease forwards;
  animation-delay: .7s;
}

#welcomeScreen p {
  opacity: 0;
  animation: textShow 1s ease forwards;
  animation-delay: 1s;
}

#enterButton {
  margin-top: 20px;
  padding: 14px 40px;

  border: 0;
  border-radius: 12px;

  background: white;
  color: #2563eb;

  font-size: 17px;
  font-weight: bold;

  cursor: pointer;

  opacity: 0;
  animation: buttonShow 1s ease forwards;
  animation-delay: 1.5s;
}

#enterButton:hover {
  transform: scale(1.05);
}

@keyframes logoShow {
  from {
    opacity: 0;
    transform: scale(.5);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes textShow {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes lineShow {
  from {
    width: 0;
  }

  to {
    width: 180px;
  }
}

@keyframes buttonShow {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>  </head>  <body> <body>

<div id="welcomeScreen">

    <div class="welcomeLogo">
  🎓
</div>

  <h1>StudentUZ</h1>

  <div class="logoLine"></div>

  <p>O‘quvchilar platformasi</p>

  <button id="enterButton">
    KIRISH
  </button>
  

<header>
  <h1>🎓 StudentUZ</h1> <header>  
  <h1>🎓 Student.uz</h1>  
  <p>O‘quvchilar uchun platforma</p>  
</header>  <div class="container">    <div id="dashboard">  <div class="card">  

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

  </div>    <div id="details" class="hidden">  <div class="card">  

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

<hr>  <h3>💳 Qarz to‘lash</h3>  <input
id="paymentAmount"
type="number"
placeholder="To‘lanadigan summa"

> 

<button id="payButton" class="pay">  
  💳 Qarz to‘lash  
</button>  <p id="paymentMessage"></p>  
      <hr>  
<hr>  <h3>🔴 Qarz qo‘yish</h3>  <input
id="debtAmount"
type="number"
placeholder="Qarz summasi"

> 

<button id="debtButton" class="debtAdd">  
  ➕ Qarz qo‘yish  
</button>  <p id="debtMessage"></p>  
<hr>  <h3>📅 Bugungi davomat</h3>  <button id="cameButton" class="came">  
  ✅ Bugun keldi  
</button>  <p id="attendanceMessage"></p>  
<button id="absentButton" class="absent">  
  ❌ Bugun kelmadi  
</button>  
      <h3>✏️ Tahrirlash</h3>  <input  
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

  </div>  </div>  <script>  
  
let students = [];  
let selectedStudentId = null;  
  
  
// ELEMENTLAR  
const addButton =  
  document.getElementById("addButton");  
  const reportButton =
  document.getElementById("reportButton");

reportButton.addEventListener("click", function() {
  window.location.href = "/reports";
});
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
  
  
// RO‘YXATNI CHIQARISH  
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
      Math.max(  
        student.fee - student.paid,  
        0  
      );  
  
  
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
    card.appendChild(debtText);  
    card.appendChild(came);  
    card.appendChild(absent);  
    card.appendChild(detailButton);  
    card.appendChild(editButton);  
    card.appendChild(deleteButton);  
  
  
    list.appendChild(card);  
  
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
    Math.max(  
      student.fee - student.paid,  
      0  
    );  
  
  
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
  
  
renderStudents();  
payButton.addEventListener("click", function() {  
  
  const student = students.find(function(item) {  
    return item.id === selectedStudentId;  
  });  
  
  if (!student) return;  
  
  const amount = Number(  
    document.getElementById("paymentAmount").value  
  );  
  
  const message =  
    document.getElementById("paymentMessage");  
  
  const debt =  
    Math.max(student.fee - student.paid, 0);  
  
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
  
  document.getElementById("paymentAmount").value = "";  
  
  message.className = "success";  
  message.textContent =  
    "✅ " + amount.toLocaleString() + " so‘m to‘landi!";  
  
  updateDetails(student);  
  renderStudents();  
  
});  
debtButton.addEventListener("click", function() {  
  
  const student = students.find(function(item) {  
    return item.id === selectedStudentId;  
  });  
  
  if (!student) return;  
  
  const amount = Number(  
    document.getElementById("debtAmount").value  
  );  
  
  const message =  
    document.getElementById("debtMessage");  
  
  if (amount <= 0) {  
    message.className = "error";  
    message.textContent =  
      "❌ Qarz summasini kiriting.";  
    return;  
  }  
  
  student.debt += amount;  
  
  document.getElementById("debtAmount").value = "";  
  
  message.className = "success";  
  message.textContent =  
    "🔴 " + amount.toLocaleString() +  
    " so‘m qarz qo‘yildi!";  
  
  updateDetails(student);  
  renderStudents();  
  
});  
cameButton.addEventListener("click", function() {  
  
  const student = students.find(function(item) {  
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
  
});  
absentButton.addEventListener("click", function() {  
  
  const student = students.find(function(item) {  
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
  
});  
document.getElementById("enterButton").addEventListener("click", function() {

  const welcome = document.getElementById("welcomeScreen");

  welcome.style.opacity = "0";

  setTimeout(function() {
    welcome.style.display = "none";
  }, 500);

});
</script>  </body>  
</html>  
  `);  
  
}); 
app.get("/reports", (req, res) => {
res.send(`

<!DOCTYPE html><html lang="uz">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>StudentUZ - Hisobotlar</title><style>
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
  padding: 25px;
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
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,.08);
}

.back {
  background: #e2e8f0;
  color: #0f172a;
  border: 0;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
}

.reports {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
}

.report {
  padding: 22px;
  border-radius: 16px;
  color: white;
}

.report h2 {
  margin-top: 0;
}

.students {
  background: #2563eb;
}

.payments {
  background: #16a34a;
}

.debts {
  background: #dc2626;
}

.attendance {
  background: #7c3aed;
}

.number {
  font-size: 28px;
  font-weight: bold;
}
</style></head><body><header>
  <h1>📊 Hisobotlar</h1>
  <p>StudentUZ oylik hisobotlari</p>
</header><div class="container">  <div class="card">
    <button class="back" onclick="location.href='/'">
      ← Bosh sahifaga
    </button>
  </div>  <div class="reports"><div class="report students">
  <h2>👨‍🎓 O‘quvchilar</h2>
  <div class="number">0 ta</div>
</div>

<div class="report payments">
  <h2>💰 To‘lovlar</h2>
  <div class="number">0 so‘m</div>
</div>

<div class="report debts">
  <h2>🔴 Qarzlar</h2>
  <div class="number">0 so‘m</div>
</div>

<div class="report attendance">
  <h2>📅 Davomat</h2>
  <div class="number">0 kun</div>
</div>

  </div></div></body>
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
