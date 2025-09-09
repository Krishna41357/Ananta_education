import { useEffect, useState } from "react";
import API from "../services/api";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses").then(res => setCourses(res.data));
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {courses.map(course => <CourseCard key={course._id} course={course} />)}
    </div>
  );
}
