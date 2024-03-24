// import { UserService } from "../userService";
// import { UserRepo } from "../../database/repository/userRepo";
// import { hashPassword } from "../../utils/hashPassword"; // <-- Corrected import path

// // Mock hashPassword function since it's tested separately
// jest.mock("../../utils/hashPassword", () => ({
//   hashPassword: jest.fn(),
// }));

// describe("UserService Integration Tests", () => {
//   let userService: UserService;

//   beforeAll(() => {
//     // You may need to set up your test database connection here
//     // Initialize the userService
//     userService = new UserService();
//   });

//   beforeEach(() => {
//     // Clear any mock calls between tests
//     jest.clearAllMocks();
//   });

//   it("should create a user", async () => {
//     // Mocking hashPassword function to return a fixed value
//     (hashPassword as jest.Mock).mockResolvedValue("hashedPassword"); // <-- Casting to jest.Mock

//     // Mocking createUser method of UserRepo
//     (UserRepo.prototype.createUser as jest.Mock).mockResolvedValue({
//       id: "1",
//       username: "testuser",
//     }); // <-- Casting to jest.Mock

//     const userData = { username: "testuser", password: "testpassword" };
//     const createdUser = await userService.createUser(userData);

//     expect(hashPassword).toHaveBeenCalledWith(userData.password);
//     expect(UserRepo.prototype.createUser).toHaveBeenCalledWith({
//       ...userData,
//       password: "hashedPassword",
//     });
//     expect(createdUser).toEqual({ id: "1", username: "testuser" });
//   });

//   // Add more integration tests for other methods like getAllUsers, getUserById, updateUser, deleteUser
// });
