import { Request, Response, NextFunction } from "express";
import { object, string } from "zod";
// import { User } from "../models/user"; // Import your User model from where it's defined
import { User } from "../database/models/user";

// Define your user schema using Zod
const userSchema = object({
  username: string().min(3, "Username must be at least 3 characters long"),
  email: string().email("Invalid email address"),
  password: string().min(
    8,
    "Password must be at least 8 characters long"
  ),
  // Add more validations as per your requirements
});

// Middleware function to validate user
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body against the user schema
    const userData = userSchema.parse(req.body);

    // Check if the email is already registered
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already in used" });
    }

    // If validation succeeds and the email is not already registered, move to the next middleware
    next();
  } catch (error: any) {
    // If validation fails, format error message and send a response
    const errorMessages = error.errors.map((e: any) => e.message);
    res.status(400).json({ message: errorMessages });
  }
};
