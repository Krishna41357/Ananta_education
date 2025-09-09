import express from "express";
import {
  getColleges,
  createCollege,
  updateCollege,
  deleteCollege,
} from "../controllers/collegeController.js";

const router = express.Router();

router.get("/", getColleges);
router.post("/", createCollege);
router.put("/:id", updateCollege);
router.delete("/:id", deleteCollege);

export default router;
