import Course from "../models/courseSchema.js";
import College from "../models/collegeSchema.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("colleges");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new course
export const createCourse = async (req, res) => {
  try {
    const { name, level, eligibility, colleges } = req.body;

    const course = new Course({ name, level, eligibility, colleges });
    await course.save();

    // 🔄 update each college
    if (colleges && colleges.length > 0) {
      await College.updateMany(
        { _id: { $in: colleges } },
        { $addToSet: { coursesOffered: course._id } }
      );
    }

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { colleges, ...rest } = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      { ...rest, colleges },
      { new: true }
    );

    if (colleges) {
      // Remove course from old colleges
      await College.updateMany(
        { coursesOffered: id },
        { $pull: { coursesOffered: id } }
      );

      // Add to new colleges
      await College.updateMany(
        { _id: { $in: colleges } },
        { $addToSet: { coursesOffered: id } }
      );
    }

    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);

    // 🔄 remove from colleges
    await College.updateMany(
      { coursesOffered: id },
      { $pull: { coursesOffered: id } }
    );

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
