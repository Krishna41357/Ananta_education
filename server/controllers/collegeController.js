import College from "../models/collegeSchema.js";

// Get all colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find().populate("coursesOffered");
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new college
export const createCollege = async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update college
export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await College.findByIdAndUpdate(id, req.body, { new: true });
    res.json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete college
export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    await College.findByIdAndDelete(id);
    res.json({ message: "College deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
