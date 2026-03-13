import mongodb from "mongoose";
import { DB_URI, NODE_ENV } from "../config/eng.js";
import mongoose from "mongoose";

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
    console.error("Error connecting to database", error);
    process.exit(1);
    throw error;
  }
};

export default connectToDatabase;
