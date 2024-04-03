import jwt from "jsonwebtoken";

// Function to generate JWT token without payload
export function generateToken(
  secretKey: string,
  expiresIn: string = "1h"
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign({}, secretKey, { expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
}
