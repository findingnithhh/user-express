
import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI ||'';

// Connect to MongoDB
const connectionToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(mongodbUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

export default connectionToDatabase;
