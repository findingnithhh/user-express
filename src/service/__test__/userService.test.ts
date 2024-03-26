import { UserService } from "../../service/userService";
import { UserRepo } from "../../database/repository/userRepo";
import { hashPassword } from "../../utils/hashPassword"; // Import hashPassword function

// Mock UserRepo class
jest.mock("../../database/repository/userRepo");

// Mock hashPassword function
jest.mock("../../utils/hashPassword", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashedPassword123"), // Mock hashPassword function implementation
}));

describe("UserService", () => {
  let userService: { createUser: (arg0: { username: string; password: string; }) => any; };

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods of UserRepo
    UserRepo.mockClear();
    // Create a new instance of UserService
    userService = new UserService();
  });

  describe("createUser", () => {
    it("should call createUser method of UserRepo with hashed password", async () => {
      const userData = { username: "testuser", password: "password123" };
      await userService.createUser(userData);
      expect(UserRepo.prototype.createUser).toHaveBeenCalledWith({
        ...userData,
        password: "hashedPassword123", // Ensure this value matches the expected hashed password value
      });
    });
  });

  // Other test cases...
});
