import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";

dotenv.config();

export function generateToken(userId: string): string {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
    expiresIn: "1h",
  });
  return token;
}
