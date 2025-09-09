import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },       // e.g., B.Tech, MBA
  level: { type: String, required: true },      // e.g., Bachelor, Master
  eligibility: { type: String, required: true } // e.g., 12th PCM, Graduation
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
