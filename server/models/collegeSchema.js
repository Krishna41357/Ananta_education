import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  region: { 
    type: String, 
    enum: ["India", "Abroad"], 
    required: true,
    default: "India"
  },
  description: { type: String },
  image: { type: String },
  coursesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: Date.now },
});

const College = mongoose.model("College", CollegeSchema);
export default College;