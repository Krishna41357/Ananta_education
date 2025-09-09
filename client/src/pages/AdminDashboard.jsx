import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Student Registrations</h3>
      <ul>
        {students.map(stu => (
          <li key={stu._id}>
            {stu.name} - {stu.phone} - {stu.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
