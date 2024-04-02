import Token from "../database/models/userToken";

export async function saveToken(userId:number, token:string) {
  await Token.create({ userId, token });
}
