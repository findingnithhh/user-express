import { Request, Response, NextFunction } from "express";
import { object, string } from "zod";

// Define your user schema using Zod
const userSchema = object({
  username: string().min(3),
  email: string().email(),
  password: string().min(8),
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
    const errorMessage = formatErrorMessage(error.errors);
    res.status(400).json({ message: errorMessage });
  }
};

// Function to format error messages
const formatErrorMessage = (errors: any[]) => {
  return errors.map((error) => {
    if (error.path[0] === "username" && error.code === "too_small") {
      return "Username must be at least 3 characters long.";
    }
    if (error.path[0] === "email" && error.code === "invalid_email") {
      return "Invalid email format.";
    }
    if (error.path[0] === "password" && error.code === "too_small") {
      return "Password must be at least 8 characters long.";
    }
    // Add more conditions for other types of errors if needed
    return error.message;
  });
};
