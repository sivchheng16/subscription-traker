import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/eng.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Check if user already exists
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      const error = new Error("Name, email, and password are required");
      error.statusCode = 400;
      throw error;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save({ session });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      create: true,
      message: "User created successfully",
      data: {
        token: token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error; 
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token: jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN,
        }),
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
