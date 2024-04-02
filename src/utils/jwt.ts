// jwt.ts
import jwt from "jsonwebtoken";
import { User } from "../database/models/user";
import mongoose from "mongoose";

const JWT_SECRET = "ThisIsASecretKeyForJWT";

export async function verifyEmailToken(
  token: string
): Promise<mongoose.Types.ObjectId> {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET); // Use the JWT secret from environment variable

    // Retrieve userId from the decoded token
    const userId = decoded.userId;

    // Retrieve the user document associated with the token
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the token user ID matches the user document's ID
    if (user._id.toString() !== userId) {
      throw new Error("Token is not valid for this user");
    }

    // If the user exists and the token is valid, return the userId
    return userId;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
