import { randomBytes } from "crypto";
import Token from "../database/models/userToken";

export function generateEmailVerificationToken(userId: number) {
  return randomBytes(32).toString("hex");
}

export async function saveToken(userId:number, token:string) {
  await Token.create({ userId, token });
}
