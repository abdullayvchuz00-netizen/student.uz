const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public papkadagi fayllarni ko'rsatish
app.use(express.static("public"));

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB ulandi"))
  .catch((err) => console.error("MongoDB xatosi:", err.message));

// O'quvchi modeli
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    monthlyFee: {
      type: Number,
      default: 0
    },
    paid: {
      type: Number,
      default: 0
    },
    attendance: [
      {
        date: String,
        status: {
          type: String,
          enum: ["keldi", "kelmadi"]
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("Student", studentSchema);

// Bosh sahifa
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        message: "Barcha maydonlarni to'ldiring"
      });
    }

    const oldStudent = await Student.findOne({ username });

    if (oldStudent) {
      return res.status(400).json({
        message: "Bu username allaqachon mavjud"
      });
    }

    const student = await Student.create({
      name,
      username,
      password
    });

    res.status(201).json({
      message: "Ro'yxatdan o'tish muvaffaqiyatli!",
      studentId: student._id
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Server xatosi"
    });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const student = await Student.findOne({
      username,
      password
    });

    if (!student) {
      return res.status(401).json({
        message: "Username yoki parol noto'g'ri"
      });
    }

    const debt = Math.max(
      student.monthlyFee - student.paid,
      0
    );

    res.json({
      message: "Kirish muvaffaqiyatli!",
      student: {
        id: student._id,
        name: student.name,
        username: student.username,
        monthlyFee: student.monthlyFee,
        paid: student.paid,
        debt,
        attendance: student.attendance
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server xatosi"
    });
  }
});

// O'QUVCHI MA'LUMOTLARI
app.get("/api/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "O'quvchi topilmadi"
      });
    }

    const debt = Math.max(
      student.monthlyFee - student.paid,
      0
    );

    const came = student.attendance.filter(
      item => item.status === "keldi"
    ).length;

    const absent = student.attendance.filter(
      item => item.status === "kelmadi"
    ).length;

    res.json({
      name: student.name,
      monthlyFee: student.monthlyFee,
      paid: student.paid,
      debt,
      came,
      absent,
      attendance: student.attendance
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server xatosi"
    });
  }
});

// DAVOMAT
app.post("/api/attendance", async (req, res) => {
  try {
    const {
      studentId,
      date,
      status
    } = req.body;

    if (
      !studentId ||
      !date ||
      !["keldi", "kelmadi"].includes(status)
    ) {
      return res.status(400).json({
        message: "Ma'lumotlar noto'g'ri"
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "O'quvchi topilmadi"
      });
    }

    student.attendance.push({
      date,
      status
    });

    await student.save();

    res.json({
      message: "Davomat saqlandi!"
    });
  } catch (error) {
    console.error("Attendance error:", error);

    res.status(500).json({
      message: "Server xatosi"
    });
  }
});

// TO'LOV
app.post("/api/payment", async (req, res) => {
  try {
    const {
      studentId,
      amount
    } = req.body;

    if (
      !studentId ||
      !amount ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        message: "To'lov summasi noto'g'ri"
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "O'quvchi topilmadi"
      });
    }

    student.paid += Number(amount);

    if (student.paid > student.monthlyFee) {
      student.paid = student.monthlyFee;
    }

    await student.save();

    const debt = Math.max(
      student.monthlyFee - student.paid,
      0
    );

    res.json({
      message: "To'lov saqlandi!",
      paid: student.paid,
      debt
    });
  } catch (error) {
    console.error("Payment error:", error);

    res.status(500).json({
      message: "Server xatosi"
    });
  }
});

// YANGI OY
app.post("/api/month", async (req, res) => {
  try {
    const {
      studentId,
      monthlyFee
    } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "O'quvchi topilmadi"
      });
    }

    student.monthlyFee = Number(monthlyFee);
    student.paid = 0;

    await student.save();

    res.json({
      message: "Yangi oy yaratildi!",
      monthlyFee: student.monthlyFee,
      debt: student.monthlyFee
    });
  } catch (error) {
    console.error("Month error:", error);

    res.status(500).json({
      message: "Server xatosi"
    });
  }
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server ${PORT}-portda ishlayapti`
  );
});
