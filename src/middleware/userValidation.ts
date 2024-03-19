import { Request, Response, NextFunction } from "express";
import { object, string } from "zod";

// Define your user schema using Zod
const userSchema = object({
  username: string().min(3, "Username must be at least 3 characters long"),
  email: string().email("Invalid email address"),
  password: string().min(8, "Passwod not strong please give at least 8 characters"),
  // Add more validations as per your requirements
});

// Middleware function to validate user
export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body against the user schema
    userSchema.parse(req.body);
    // If validation succeeds, move to the next middleware
    next();
  } catch (error: any) {
    // If validation fails, format error message and send a response
    const errorMessage = error.errors[0].message;
    res.status(400).json({ message: errorMessage });
  }
};

