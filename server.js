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
</head>

<body>
  <h1>🎓 StudentUZ</h1>
  <h2>O‘quvchilar</h2>

  <div id="students"></div>

  <script>
    const students = [
      {
        name: "Ali",
        fee: 500000,
        paid: 300000,
        came: 18,
        absent: 2
      },
      {
        name: "Vali",
        fee: 500000,
        paid: 500000,
        came: 20,
        absent: 0
      }
    ];

    const box = document.getElementById("students");

    students.forEach(function(student) {

      const debt = Math.max(student.fee - student.paid, 0);

      const card = document.createElement("div");

      card.style.background = "#f1f5f9";
      card.style.padding = "20px";
      card.style.margin = "15px";
      card.style.borderRadius = "15px";

      card.innerHTML =
        "<h3>👤 " + student.name + "</h3>" +
        "<p>💰 Oylik: " + student.fee.toLocaleString() + " so‘m</p>" +
        "<p>✅ To‘langan: " + student.paid.toLocaleString() + " so‘m</p>" +
        "<p>🔴 Qarz: " + debt.toLocaleString() + " so‘m</p>" +
        "<p>📅 Keldi: " + student.came + " kun</p>" +
        "<p>❌ Kelmadi: " + student.absent + " kun</p>" +
        "<button onclick='showStudent()'>Batafsil</button>";

      box.appendChild(card);
    });

    function showStudent() {
      alert("O‘quvchining batafsil ma’lumotlari");
    }
  </script>

</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function() {
  console.log("StudentUZ server ishlayapti");
});
