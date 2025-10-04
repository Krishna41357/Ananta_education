import express from "express";
import {
  getColleges,
  getIndianColleges,
  getAbroadColleges,
  getCollegesByRegion,
  createCollege,
  updateCollege,
  deleteCollege,
} from "../controllers/collegeController.js";

const router = express.Router();

router.get("/", getColleges);
router.get("/india", getIndianColleges);
router.get("/abroad", getAbroadColleges);
router.get("/region/:region", getCollegesByRegion);
router.post("/", createCollege);
router.put("/:id", updateCollege);
router.delete("/:id", deleteCollege);

export default router;