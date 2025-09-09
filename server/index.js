import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// load env vars
dotenv.config();
console.log("MONGO_URI from env:", process.env.MONGO_URI);

import studentRoutes from "./routes/studentRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// routes
app.get("/", (req, res) => {
  res.send("College Consultancy API is running 🚀");
});

app.use("/students", studentRoutes);
app.use("/colleges", collegeRoutes);
app.use("/courses", courseRoutes);

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
