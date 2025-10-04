// deleteAllColleges.js
import mongoose from "mongoose";
import College from "./models/collegeSchema.js";

// MongoDB connection
const MONGO_URI =
  "mongodb+srv://krishnasrivastava11244:kri1234shna@cluster0.zuugz8k.mongodb.net/?retryWrites=true&w=majority";

const deleteAllColleges = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Delete all colleges
    const result = await College.deleteMany({});
    
    console.log(`🗑️  Deleted ${result.deletedCount} colleges from the collection`);
    console.log("✅ All colleges deleted successfully!");
    
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error deleting colleges:", err);
    mongoose.disconnect();
  }
};

deleteAllColleges();