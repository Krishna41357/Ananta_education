// seed.js
import mongoose from "mongoose";
import College from "./models/collegeSchema.js";
import Course from "./models/courseSchema.js";

// MongoDB connection
const MONGO_URI =
  "mongodb+srv://krishnasrivastava11244:kri1234shna@cluster0.zuugz8k.mongodb.net/?retryWrites=true&w=majority";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // --- All Courses (Original + New) ---
    const courses = [
      // Original 19 courses
      { name: "B.Tech", level: "Bachelor", eligibility: "10+2 with PCM" },
      { name: "M.Tech", level: "Master", eligibility: "Bachelor in Engineering" },
      { name: "BCA", level: "Bachelor", eligibility: "10+2 in any stream" },
      { name: "MCA", level: "Master", eligibility: "BCA or equivalent Bachelor" },
      { name: "B.Sc", level: "Bachelor", eligibility: "10+2 in Science" },
      { name: "M.Sc", level: "Master", eligibility: "Bachelor in relevant field" },
      { name: "BBA", level: "Bachelor", eligibility: "10+2" },
      { name: "MBA", level: "Master", eligibility: "Graduation" },
      { name: "B.Com", level: "Bachelor", eligibility: "10+2 in Commerce/Any Stream" },
      { name: "M.Com", level: "Master", eligibility: "B.Com or equivalent" },
      { name: "BA", level: "Bachelor", eligibility: "10+2" },
      { name: "MA", level: "Master", eligibility: "Bachelor in relevant field" },
      { name: "LLB", level: "Bachelor", eligibility: "10+2" },
      { name: "BA LLB (Integrated)", level: "Bachelor", eligibility: "10+2" },
      { name: "B.Pharma", level: "Bachelor", eligibility: "10+2 with PCB" },
      { name: "D.Pharma", level: "Diploma", eligibility: "10+2 with PCB" },
      { name: "PhD", level: "Doctoral", eligibility: "Master’s degree" },
      { name: "Online MBA", level: "Master", eligibility: "Graduation" },
      { name: "Online BCA", level: "Bachelor", eligibility: "10+2" },

      // ✅ New courses
      { name: "B.Sc (Various)", level: "Bachelor", eligibility: "10+2 (Science / Other Streams depending on subject)" },
      { name: "M.Sc Computer Science", level: "Master", eligibility: "Bachelor in relevant field" },
      { name: "MBBS", level: "Bachelor", eligibility: "12 years of schooling with science / pre-medical" },
      { name: "Dentistry", level: "Bachelor", eligibility: "Science + pre-dental requirements" },
      { name: "Preventive Medicine", level: "Bachelor", eligibility: "High school science" },
      { name: "Pediatrics (Postgraduate)", level: "Master", eligibility: "Medical graduation" },
      { name: "B.Tech (Engineering)", level: "Bachelor", eligibility: "10+2 with PCM, minimum ~60%" },
      { name: "B.Des (Design)", level: "Bachelor", eligibility: "10+2; UCEED / Design entrance (where applicable)" },
      { name: "LLM Comparative Constitutional Law", level: "Master", eligibility: "LLB or equivalent law degree" },
      { name: "LLM in Human Rights", level: "Master", eligibility: "LLB or equivalent" },
      { name: "Economics, Data and Policy MA / M.Sc", level: "Master", eligibility: "Bachelor in related discipline" },
    ];

    // --- Insert courses if not exists ---
    for (const course of courses) {
      const exists = await Course.findOne({ name: course.name });
      if (!exists) {
        await Course.create(course);
        console.log(`📚 Added course: ${course.name}`);
      }
    }
    console.log("📚 Courses seeding completed (duplicates skipped)");

    // Helper to get course _id
    const getCourseId = async (name) => {
      const c = await Course.findOne({ name });
      return c?._id;
    };

    // --- Colleges ---
    const colleges = [
      {
        name: "Mahatma Gandhi Pharmacy & Engineering College",
        location: "Rajasthan, India",
        description: "Offers programs in Pharmacy and Engineering.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("M.Tech"),
          await getCourseId("B.Pharma"),
          await getCourseId("D.Pharma"),
        ],
      },
      {
        name: "UOT Jaipur (University of Technology, Jaipur)",
        location: "Jaipur, Rajasthan, India",
        description: "Private university offering technical, management and law programs.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("M.Tech"),
          await getCourseId("BBA"),
          await getCourseId("MBA"),
          await getCourseId("LLB"),
          await getCourseId("BA LLB (Integrated)"),
        ],
      },
      {
        name: "Mahatma Gandhi University of Medical Sciences & Technology",
        location: "Jaipur, Rajasthan, India",
        description: "Focuses on medical, dental, nursing and allied health sciences.",
        image: "",
        coursesOffered: [
          await getCourseId("MBBS"),
          await getCourseId("B.Sc"),
          await getCourseId("M.Sc"),
          await getCourseId("PhD"),
        ],
      },
      {
        name: "Poornima University",
        location: "Jaipur, Rajasthan, India",
        description: "Offers UG/PG programs in Engineering, Design, Management, Commerce, Law, and more.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("M.Tech"),
          await getCourseId("BBA"),
          await getCourseId("MBA"),
          await getCourseId("BCA"),
          await getCourseId("MCA"),
          await getCourseId("PhD"),
        ],
      },
      {
        name: "Manipal University Jaipur",
        location: "Jaipur, Rajasthan, India",
        description: "Part of the Manipal Group; offers programs across Engineering, Business, Law, Arts, and Design.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("M.Tech"),
          await getCourseId("BBA"),
          await getCourseId("MBA"),
          await getCourseId("LLB"),
          await getCourseId("BA"),
          await getCourseId("MA"),
        ],
      },
      {
        name: "ICFAI University Jaipur",
        location: "Jaipur, Rajasthan, India",
        description: "Known for management, law, and commerce programs.",
        image: "",
        coursesOffered: [
          await getCourseId("BBA"),
          await getCourseId("MBA"),
          await getCourseId("B.Com"),
          await getCourseId("M.Com"),
          await getCourseId("LLB"),
          await getCourseId("BA LLB (Integrated)"),
        ],
      },
      {
        name: "NIMS University Rajasthan",
        location: "Jaipur, Rajasthan, India",
        description: "Large multidisciplinary university offering Medicine, Engineering, Management, and more.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("M.Tech"),
          await getCourseId("MBA"),
          await getCourseId("BBA"),
          await getCourseId("BCA"),
          await getCourseId("MCA"),
          await getCourseId("PhD"),
        ],
      },
      {
        name: "JECRC University",
        location: "Jaipur, Rajasthan, India",
        description: "Private university offering Engineering, Management, Law, and Design programs.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("M.Tech"),
          await getCourseId("BBA"),
          await getCourseId("MBA"),
          await getCourseId("LLB"),
          await getCourseId("PhD"),
        ],
      },
      {
        name: "Amity University Rajasthan",
        location: "Jaipur, Rajasthan, India",
        description: "Part of the Amity Group; offers diverse programs in Engineering, Management, Law, and Sciences.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("MBA"),
          await getCourseId("BBA"),
          await getCourseId("LLB"),
          await getCourseId("PhD"),
          await getCourseId("Online MBA"),
          await getCourseId("Online BCA"),
        ],
      },
      {
        name: "Jaipur National University (JNU)",
        location: "Jaipur, Rajasthan, India",
        description: "Recognized university offering multidisciplinary UG, PG, and Doctoral programs.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("M.Tech"),
          await getCourseId("MBA"),
          await getCourseId("BBA"),
          await getCourseId("BCA"),
          await getCourseId("MCA"),
          await getCourseId("PhD"),
        ],
      },
      {
        name: "Apex University",
        location: "Jaipur, Rajasthan, India",
        description: "Offers courses in Engineering, Management, Law, Pharmacy, and Commerce.",
        image: "",
        coursesOffered: [
          await getCourseId("B.Tech"),
          await getCourseId("MBA"),
          await getCourseId("BBA"),
          await getCourseId("BCA"),
          await getCourseId("MCA"),
          await getCourseId("LLB"),
          await getCourseId("PhD"),
        ],
      },
    ];

    await College.insertMany(colleges);
    console.log("🎓 Colleges inserted successfully");

    console.log("✅ Seeding completed successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.disconnect();
  }
};

seedData();
