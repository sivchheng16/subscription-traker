import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/eng.js";

const connectToDatabase = async () => {
  if (!DB_URI) {
    console.warn(
      "⚠️  DB_URI not defined. Please define MONGODB_URI in .env file",
    );
    return;
  }

  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    console.warn(
      "⚠️  Continuing without database. Make sure MongoDB is running or update DB_URI in config/eng.js",
    );
  }
};

export default connectToDatabase;
