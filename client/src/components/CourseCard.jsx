export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <h4>{course.name} ({course.level})</h4>
      <p><b>Eligibility:</b> {course.eligibility}</p>
    </div>
  );
}
