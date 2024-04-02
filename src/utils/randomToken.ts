import { randomBytes } from "crypto";

export function generateEmailVerificationToken(userId: number) {
  return randomBytes(32).toString("hex");
}
