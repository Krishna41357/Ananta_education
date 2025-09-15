// seed.js
import mongoose from "mongoose";
import College from "./models/collegeSchema.js";
import Course from "./models/courseSchema.js";

// MongoDB connection
const MONGO_URI = "mongodb+srv://krishnasrivastava11244:kri1234shna@cluster0.zuugz8k.mongodb.net/?retryWrites=true&w=majority";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear old data
    await College.deleteMany({});
    await Course.deleteMany({});
    console.log("🗑️ Old data cleared");

    // --- Courses ---
    const courses = [
      // Courses for Maharishi Arvind University
      { name: "BCA", level: "Bachelor", eligibility: "10+2 in any stream" },
      { name: "B.Sc (Various)", level: "Bachelor", eligibility: "10+2 (Science / Other Streams depending on subject)" },
      { name: "MBA", level: "Master", eligibility: "Graduation" },
      { name: "B.Pharma", level: "Bachelor", eligibility: "10+2 with PCB" },
      { name: "D.Pharma", level: "Diploma", eligibility: "10+2 with PCB" },
      { name: "LLB", level: "Bachelor", eligibility: "10+2" },
      { name: "BA LLB (Integrated)", level: "Bachelor (Integrated)", eligibility: "10+2" },
      { name: "M.Sc Computer Science", level: "Master", eligibility: "Bachelor in relevant field" },

      // Courses for Bukhara Innovative Education & Medical University / Bukhara State Medical Institute
      { name: "MBBS", level: "Bachelor", eligibility: "12 years of schooling with science / pre-medical" },
      { name: "Dentistry", level: "Bachelor", eligibility: "Science + pre-dental requirements" },
      { name: "Preventive Medicine", level: "Bachelor", eligibility: "High school science" },
      { name: "Pediatrics (Postgraduate)", level: "Master", eligibility: "Medical graduation" },

      // JK Lakshmipat University
      { name: "B.Tech (Engineering)", level: "Bachelor", eligibility: "10+2 with PCM, minimum ~60%" },
      { name: "B.Des (Design)", level: "Bachelor", eligibility: "10+2; UCEED / Design entrance (where applicable)" },
      { name: "BBA", level: "Bachelor", eligibility: "10+2" },
      { name: "M.Tech", level: "Master", eligibility: "Bachelor in Engineering + qualifying exam (GATE / university norm)" },
      { name: "MBA", level: "Master", eligibility: "Graduation" },
      { name: "PhD", level: "Doctoral", eligibility: "Master’s degree / relevant qualifications" },

      // Central European University
      { name: "LLM Comparative Constitutional Law", level: "Master", eligibility: "LLB or equivalent law degree" },
      { name: "LLM in Human Rights", level: "Master", eligibility: "LLB or equivalent" },
      { name: "Economics, Data and Policy MA / M.Sc", level: "Master", eligibility: "Bachelor in related discipline" },
    ];

    const insertedCourses = await Course.insertMany(courses);
    console.log("📚 Courses inserted");

    const getCourseId = (name) => insertedCourses.find((c) => c.name === name)._id;

    // --- Colleges ---
    const colleges = [
      {
        name: "Maharishi Arvind University, Jaipur",
        location: "Jaipur, Rajasthan, India",
        description: "Offers UG, PG and Doctorate programmes in diverse fields like Computer Applications, Law, Pharmacy, Commerce & Management etc.", 
        image: "", // you can put a URL or local path
        coursesOffered: [
          getCourseId("BCA"),
          getCourseId("B.Sc (Various)"),
          getCourseId("MBA"),
          getCourseId("B.Pharma"),
          getCourseId("D.Pharma"),
          getCourseId("LLB"),
          getCourseId("BA LLB (Integrated)"),
          getCourseId("M.Sc Computer Science"),
        ],
      },
      {
        name: "Bukhara Innovative Education & Medical University",
        location: "Bukhara, Uzbekistan",
        description: "Private higher-education institution offering Medicine, Dentistry, Preventive Medicine etc.", 
        image: "",
        coursesOffered: [
          getCourseId("MBBS"),
          getCourseId("Dentistry"),
          getCourseId("Preventive Medicine"),
        ],
      },
      {
        name: "JK Lakshmipat University (JKLU), Jaipur",
        location: "Jaipur, Rajasthan, India",
        description: "Private university offering Engineering, Design, Business & Management, Postgraduate & Doctoral programmes", 
        image: "",
        coursesOffered: [
          getCourseId("B.Tech (Engineering)"),
          getCourseId("B.Des (Design)"),
          getCourseId("BBA"),
          getCourseId("M.Tech"),
          getCourseId("MBA"),
          getCourseId("PhD"),
        ],
      },
      {
        name: "Central European University (CEU)",
        location: "Vienna / Budapest / Online (Europe-based)",
        description: "International university offering Master’s, Doctoral and Interdisciplinary Bachelor’s programmes especially in Social Sciences, Humanities, Law, Economics etc.", 
        image: "",
        coursesOffered: [
          getCourseId("LLM Comparative Constitutional Law"),
          getCourseId("LLM in Human Rights"),
          getCourseId("Economics, Data and Policy MA / M.Sc"),
        ],
      },
      // If you want, you can add Mahatma Gandhi Pharmacy and Engineering College, Study Abroad etc similarly
    ];

    await College.insertMany(colleges);
    console.log("🎓 Colleges inserted");

    console.log("✅ Seeding completed successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.disconnect();
  }
};

seedData();
