import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  courseInterested: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  collegeInterested: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  submittedAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
