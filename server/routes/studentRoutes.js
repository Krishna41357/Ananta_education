import express from "express";
import {
  createStudent,
  getStudents,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent);      // Register student
router.get("/", getStudents);         // Get all students
router.delete("/:id", deleteStudent); // Delete student

export default router;
