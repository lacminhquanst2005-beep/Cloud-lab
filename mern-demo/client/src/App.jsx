import { useEffect, useState } from "react";
import "./App.css";
function App() {
  // Danh sách sinh viên
  const [students, setStudents] = useState([]);

  // State Form
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  // Lấy danh sách sinh viên
  useEffect(() => {
    fetch("/api/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);


  // Câu 49: Gửi dữ liệu POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/students", {
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
  // Sửa sinh viên
const handleEdit = async (student) => {
  const newName = prompt("Nhập họ tên mới:", student.name);
  const newEmail = prompt("Nhập email mới:", student.email);

  if (newName === null || newEmail === null) {
    return;
  }

  try {
    const response = await fetch(`/api/students/${student._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: student.studentId,
        name: newName,
        email: newEmail,
      }),
    });

    if (!response.ok) {
      throw new Error("Cập nhật thất bại");
    }

    const updatedStudent = await response.json();

    setStudents(
      students.map((item) =>
        item._id === student._id ? updatedStudent : item
      )
    );

    alert("Cập nhật sinh viên thành công!");
  } catch (error) {
    console.error("Lỗi:", error);
    alert("Có lỗi khi cập nhật sinh viên!");
  }
};


// Xóa sinh viên
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Bạn có chắc muốn xóa sinh viên này không?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Xóa thất bại");
    }

    setStudents(
      students.filter((student) => student._id !== id)
    );

    alert("Xóa sinh viên thành công!");
  } catch (error) {
    console.error("Lỗi:", error);
    alert("Có lỗi khi xóa sinh viên!");
  }
};


  return (
  <div className="container">

    <h1>Quản lý sinh viên</h1>

    <div className="form-box">

      <h2>Thêm sinh viên</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>MSSV</label>

          <input
            type="text"
            placeholder="Nhập MSSV"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Họ tên</label>

          <input
            type="text"
            placeholder="Nhập họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Nhập Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">
          Thêm sinh viên
        </button>

      </form>

    </div>

    <h2>Danh sách sinh viên</h2>

    {students.length === 0 && (
      <p className="no-data">
        Chưa có dữ liệu sinh viên
      </p>
    )}

    <div className="student-list">

    {students.map((student) => (

     <div className="student-card" key={student._id}>

      <p>
        <strong>MSSV:</strong> {student.studentId}
      </p>

      <p>
        <strong>Họ tên:</strong> {student.name}
      </p>

      <p>
        <strong>Email:</strong> {student.email}
      </p>

      <div className="button-group">

        <button
          className="edit-button"
          onClick={() => handleEdit(student)}
        >
          ✏️ Sửa
        </button>

        <button
          className="delete-button"
          onClick={() => handleDelete(student._id)}
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