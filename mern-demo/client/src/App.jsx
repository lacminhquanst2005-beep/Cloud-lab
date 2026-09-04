import { useEffect, useState } from "react";

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


  return (
    <div>

      <h1>Quản lý sinh viên</h1>


      <h2>Thêm sinh viên</h2>


      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <div>
          <label>MSSV:</label>

          <br />

          <input
            type="text"
            placeholder="Nhập MSSV"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>


        <br />


        <div>
          <label>Họ tên:</label>

          <br />

          <input
            type="text"
            placeholder="Nhập họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>


        <br />


        <div>
          <label>Email:</label>

          <br />

          <input
            type="email"
            placeholder="Nhập Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        <br />


        <button type="submit">
          Thêm sinh viên
        </button>

      </form>


      <hr />


      <h2>Danh sách sinh viên</h2>


      {students.length === 0 && (
        <p>Chưa có dữ liệu sinh viên</p>
      )}


      {students.map((student) => (

        <div key={student._id}>

          <p>MSSV: {student.studentId}</p>

          <p>Họ tên: {student.name}</p>

          <p>Email: {student.email}</p>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default App;