import { UserService } from "../userService";
import { UserRepo } from "../../database/repository/userRepo";
import { hashPassword } from "../../utils/hashPassword"; 

// Mock UserRepo
jest.mock("../database/repository/userRepo", () => ({
  UserRepo: jest.fn(() => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  })),
}));

// Mock hashPassword
jest.mock("../utils/hashPassword", () => ({
  hashPassword: jest.fn(),
}));

describe("UserService Unit Tests", () => {
  let userService: UserService;
  let userRepoMock: jest.Mocked<UserRepo>;

  beforeEach(() => {
    userRepoMock = new UserRepo() as jest.Mocked<UserRepo>;
    userService = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should call userRepo.getAllUsers", async () => {
      await userService.getAllUsers();
      expect(userRepoMock.getAllUsers).toHaveBeenCalled();
    });
  });

  describe("getUserById", () => {
    it("should call userRepo.getUserById with correct userId", async () => {
      const userId = "123";
      await userService.getUserById(userId);
      expect(userRepoMock.getUserById).toHaveBeenCalledWith(userId);
    });
  });

  describe("createUser", () => {
    it("should call hashPassword and userRepo.createUser with hashed password", async () => {
      const userData = { username: "testuser", password: "testpassword" };
      (hashPassword as jest.Mock).mockResolvedValue("hashedPassword");

      await userService.createUser(userData);

      expect(hashPassword).toHaveBeenCalledWith(userData.password);
      expect(userRepoMock.createUser).toHaveBeenCalledWith({
        ...userData,
        password: "hashedPassword",
      });
    });
  });

  describe("updateUser", () => {
    it("should call userRepo.updateUser with correct userId and updatedUserData", async () => {
      const userId = "123";
      const updatedUserData = { username: "updatedUser" };

      await userService.updateUser(userId, updatedUserData);

      expect(userRepoMock.updateUser).toHaveBeenCalledWith(
        userId,
        updatedUserData
      );
    });
  });

  describe("deleteUser", () => {
    it("should call userRepo.deleteUser with correct userId", async () => {
      const userId = "123";

      await userService.deleteUser(userId);

      expect(userRepoMock.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
