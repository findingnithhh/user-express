import { hashPassword } from "../hashPassword";

describe("hashPassword function", () => {
  it("should hash the password correctly", async () => {
    const password = "mySecurePassword";
    const hashedPassword = await hashPassword(password);

    // You can add your assertion here, for example:
    // Here, you might want to verify that hashedPassword is different from the original password
    expect(hashedPassword).not.toBe(password);
  });
});
