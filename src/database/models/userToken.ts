// user-token.ts
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, default: Date.now, index: { expires: "1m" } }, // Set expiration time for 1 day
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;

