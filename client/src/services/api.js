import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", 
  headers: { "Content-Type": "application/json" },
});

// Helper: Handle API errors consistently
const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

// =================== STUDENTS ===================

// Register a new student
export const registerStudent = (studentData) =>
  handleRequest(API.post("/students", studentData));

// Get all students (admin dashboard)
export const getStudents = () => handleRequest(API.get("/students"));

// Delete a student (admin only)
export const deleteStudent = (id) =>
  handleRequest(API.delete(`/students/${id}`));

// =================== COLLEGES ===================

// Fetch all colleges
export const getColleges = () => handleRequest(API.get("/colleges"));

// Add a new college (admin only)
export const addCollege = (collegeData) =>
  handleRequest(API.post("/colleges", collegeData));

// Update a college (admin only)
export const updateCollege = (id, collegeData) =>
  handleRequest(API.put(`/colleges/${id}`, collegeData));

// Delete a college (admin only)
export const deleteCollege = (id) =>
  handleRequest(API.delete(`/colleges/${id}`));

// =================== COURSES ===================

// Fetch all courses
export const getCourses = () => handleRequest(API.get("/courses"));

// Add a new course (admin only)
export const addCourse = (courseData) =>
  handleRequest(API.post("/courses", courseData));

// Update a course (admin only)
export const updateCourse = (id, courseData) =>
  handleRequest(API.put(`/courses/${id}`, courseData));

// Delete a course (admin only)
export const deleteCourse = (id) =>
  handleRequest(API.delete(`/courses/${id}`));
export default {
  registerStudent,
  getStudents,
  deleteStudent,
  getColleges,
  addCollege,
  updateCollege,
  deleteCollege,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};
