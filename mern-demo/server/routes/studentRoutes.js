const express = require("express");
const router = express.Router();

const Student = require("../models/student");

// GET danh sách sinh viên
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách sinh viên",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  console.log("BODY NHAN DUOC:", req.body);

  try {
    const { studentId, name, email } = req.body;

    const student = await Student.create({
      studentId,
      name,
      email
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({
      message: "Lỗi khi thêm sinh viên",
      error: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Không tìm thấy sinh viên"
      });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({
      message: "Lỗi khi cập nhật sinh viên",
      error: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Không tìm thấy sinh viên"
      });
    }

    res.json({
      message: "Xóa sinh viên thành công",
      student
    });
  } catch (error) {
    res.status(400).json({
      message: "Lỗi khi xóa sinh viên",
      error: error.message
    });
  }
});
module.exports = router;