import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },       // e.g., B.Tech, MBA
  level: { type: String, required: true },      // e.g., Bachelor, Master
  eligibility: { type: String, required: true },
  colleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "College" }]
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
