import { randomBytes } from "crypto";

export function generateEmailVerificationToken(userId: string) {
  return randomBytes(32).toString("hex");
}
