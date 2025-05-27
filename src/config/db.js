import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connecting to MongoDB without legacy options
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
