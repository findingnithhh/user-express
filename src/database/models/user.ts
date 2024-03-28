import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerfied: boolean;
  // Add more fields as needed
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerfied: {type: Boolean, require: false},
  // Define more fields here
});

export const User = mongoose.model<IUser>("User", userSchema);
