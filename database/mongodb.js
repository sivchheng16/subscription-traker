import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/eng.js";


if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI engironment variable inside .env.js",
  );
}

const connectToDatabase = async () => {
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
