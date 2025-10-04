import College from "../models/collegeSchema.js";
import Course from "../models/courseSchema.js";

// Get all colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find().populate("coursesOffered");
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Indian colleges only
export const getIndianColleges = async (req, res) => {
  try {
    const colleges = await College.find({ region: "India" }).populate("coursesOffered");
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Abroad colleges only
export const getAbroadColleges = async (req, res) => {
  try {
    const colleges = await College.find({ region: "Abroad" }).populate("coursesOffered");
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get colleges by region (flexible)
export const getCollegesByRegion = async (req, res) => {
  try {
    const { region } = req.params; // "India" or "Abroad"
    
    // Validate region
    if (!["India", "Abroad"].includes(region)) {
      return res.status(400).json({ error: "Invalid region. Use 'India' or 'Abroad'" });
    }
    
    const colleges = await College.find({ region }).populate("coursesOffered");
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new college
export const createCollege = async (req, res) => {
  try {
    const { name, location, description, image, coursesOffered, region } = req.body;

    const college = new College({ 
      name, 
      location, 
      description, 
      image, 
      coursesOffered,
      region 
    });
    await college.save();

    // 🔄 update each course with this college
    if (coursesOffered && coursesOffered.length > 0) {
      await Course.updateMany(
        { _id: { $in: coursesOffered } },
        { $addToSet: { colleges: college._id } }
      );
    }

    res.status(201).json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update college
export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { coursesOffered, ...rest } = req.body;

    const college = await College.findByIdAndUpdate(
      id,
      { ...rest, coursesOffered },
      { new: true }
    );

    if (coursesOffered) {
      // Remove this college from all courses first
      await Course.updateMany(
        { colleges: id },
        { $pull: { colleges: id } }
      );

      // Add this college to the new set of courses
      await Course.updateMany(
        { _id: { $in: coursesOffered } },
        { $addToSet: { colleges: id } }
      );
    }

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

    // 🔄 remove from courses
    await Course.updateMany(
      { colleges: id },
      { $pull: { colleges: id } }
    );

    res.json({ message: "College deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};