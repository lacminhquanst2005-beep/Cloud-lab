import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // Danh sách sinh viên
  const [students, setStudents] = useState([]);

  // State Form
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ================================
  // LẤY DANH SÁCH SINH VIÊN
  // ================================
  useEffect(() => {
    fetch(`${API_URL}/api/students`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không thể lấy danh sách sinh viên");
        }
        return res.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách:", err);
      });
  }, []);

  // ================================
  // THÊM SINH VIÊN
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/students`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          studentId: studentId,
          name: name,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Thêm sinh viên thất bại");
      }

      const data = await response.json();

      console.log("Sinh viên vừa thêm:", data);

      // Thêm sinh viên mới vào danh sách
      setStudents((prevStudents) => [
        ...prevStudents,
        data,
      ]);

      alert("Thêm sinh viên thành công!");

      // Xóa dữ liệu trong Form
      setStudentId("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi khi thêm sinh viên!");
    }
  };

  // ================================
  // SỬA SINH VIÊN
  // ================================
  const handleEdit = async (student) => {
    const newName = prompt(
      "Nhập họ tên mới:",
      student.name
    );

    const newEmail = prompt(
      "Nhập email mới:",
      student.email
    );

    if (newName === null || newEmail === null) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/students/${student._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            studentId: student.studentId,
            name: newName,
            email: newEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Cập nhật thất bại");
      }

      const updatedStudent = await response.json();

      // Cập nhật lại danh sách
      setStudents((prevStudents) =>
        prevStudents.map((item) =>
          item._id === student._id
            ? updatedStudent
            : item
        )
      );

      alert("Cập nhật sinh viên thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi khi cập nhật sinh viên!");
    }
  };

  // ================================
  // XÓA SINH VIÊN
  // ================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa sinh viên này không?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Xóa thất bại");
      }

      // Xóa khỏi danh sách trên giao diện
      setStudents((prevStudents) =>
        prevStudents.filter(
          (student) => student._id !== id
        )
      );

      alert("Xóa sinh viên thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi khi xóa sinh viên!");
    }
  };

  // ================================
  // GIAO DIỆN
  // ================================
  return (
    <div className="container">

      <h1>
        Quản lý sinh viên - Docker Version 2.0
      </h1>

      {/* ================================
          FORM THÊM SINH VIÊN
          ================================ */}

      <div className="form-box">

        <h2>Thêm sinh viên</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>MSSV</label>

            <input
              type="text"
              placeholder="Nhập MSSV"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Họ tên</label>

            <input
              type="text"
              placeholder="Nhập họ tên"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Nhập Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <button type="submit">
            Thêm sinh viên
          </button>

        </form>

      </div>

      {/* ================================
          DANH SÁCH SINH VIÊN
          ================================ */}

      <h2>Danh sách sinh viên</h2>

      {students.length === 0 && (
        <p className="no-data">
          Chưa có dữ liệu sinh viên
        </p>
      )}

      <div className="student-list">

        {students.map((student) => (

          <div
            className="student-card"
            key={student._id}
          >

            <p>
              <strong>MSSV:</strong>{" "}
              {student.studentId}
            </p>

            <p>
              <strong>Họ tên:</strong>{" "}
              {student.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {student.email}
            </p>

            <div className="button-group">

              <button
                className="edit-button"
                onClick={() =>
                  handleEdit(student)
                }
              >
                ✏️ Sửa
              </button>

              <button
                className="delete-button"
                onClick={() =>
                  handleDelete(student._id)
                }
              >
                🗑️ Xóa
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;