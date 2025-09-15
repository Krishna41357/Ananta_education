import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  courseInterested: { type: String },   // <-- store name as text
  collegeInterested: { type: String },  // <-- store name as text
  submittedAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
