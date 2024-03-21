import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";
import { UserRepo } from "../repository/userRepo";
import { User } from "../models/user";

let mongoServer: MongoMemoryServer | undefined;

jest.mock("../models/user");

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); // Ensure server is started before getting URI
  const mongoUri = mongoServer.getUri(); // Now get the URI
  await mongoose.connect(await mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions); // Type cast to ConnectOptions
});


afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer?.stop();
});

describe("UserRepo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getAllUsers should return all users", async () => {
    const users = [{ name: "User1" }, { name: "User2" }];
    (User.find as jest.Mock).mockResolvedValue(users);
    const userRepo = new UserRepo();
    const result = await userRepo.getAllUsers();
    expect(result).toEqual(users);
    expect(User.find).toHaveBeenCalledTimes(1);
  });

  it("getUserById should return user by ID", async () => {
    const userId = "user_id";
    const user = { _id: userId, name: "User1" };
    (User.findById as jest.Mock).mockResolvedValue(user);
    const userRepo = new UserRepo();
    const result = await userRepo.getUserById(userId);
    expect(result).toEqual(user);
    expect(User.findById).toHaveBeenCalledWith(userId);
  });

  it("createUser should create a new user", async () => {
    const userData = { name: "User1" };
    const newUser = { _id: "new_user_id", ...userData };
    (User.prototype.save as jest.Mock).mockResolvedValue(newUser);
    const userRepo = new UserRepo();
    const result = await userRepo.createUser(userData);
    expect(result).toEqual(newUser);
    expect(User.prototype.save).toHaveBeenCalledWith();
  });

  it("updateUser should update user by ID", async () => {
    const userId = "user_id";
    const updatedUserData = { name: "Updated User" };
    const updatedUser = { _id: userId, ...updatedUserData };
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);
    const userRepo = new UserRepo();
    const result = await userRepo.updateUser(userId, updatedUserData);
    expect(result).toEqual(updatedUser);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      userId,
      updatedUserData,
      { new: true }
    );
  });

  it("deleteUser should delete user by ID", async () => {
    const userId = "user_id";
    const deletedUser = { _id: userId, name: "Deleted User" };
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedUser);
    const userRepo = new UserRepo();
    const result = await userRepo.deleteUser(userId);
    expect(result).toEqual(deletedUser);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
  });
});
