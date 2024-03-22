import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { UserRepo } from "../repository/userRepo";
import { User } from "../models/user";

let mongoServer: MongoMemoryServer;
let userRepo: UserRepo;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); // Ensure that MongoMemoryServer is fully started
  const mongoUri = mongoServer.getUri(); // No need to await here
  await mongoose.connect(mongoUri);
  userRepo = new UserRepo();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("UserRepo Integration Tests", () => {
  afterEach(async () => {
    try {
      await User.deleteMany({});
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
    }
  });

  it("should save and retrieve a user with username, email, and password", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    // Act
    const savedUser = await userRepo.createUser(userData);
    const retrievedUser = await userRepo.getUserById(savedUser._id);

    // Assert
    expect(retrievedUser).not.toBeNull(); // Ensure retrievedUser is not null
      // Only proceed if retrievedUser is not null
      expect(retrievedUser?.username).toBe(userData.username);
      expect(retrievedUser?.email).toBe(userData.email);
      expect(retrievedUser?.password).toBe(userData.password);
      // You may need to hash the password before comparing it
  });

  it("should get all users", async () => { 
    const userData1 = {
      username: "user1",
      email: "user1@example.com",
      password: "password123",
    };

    const userData2 = {
      username: "user2",
      email: "user2@example.com",
      password: "password456",
    };

    await userRepo.createUser(userData1);
    await userRepo.createUser(userData2);

    const allUsers = await userRepo.getAllUsers();

    expect(allUsers.length).toBe(2);
    expect(allUsers.some((user) => user.username === userData1.username)).toBe(
      true
    );
    expect(allUsers.some((user) => user.username === userData2.username)).toBe(
      true
    );

  });

  it("should update a user's details", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    const savedUser = await userRepo.createUser(userData);

    const updatedData = {
      email: "updated@example.com",
    };

    await userRepo.updateUser(savedUser._id, updatedData);

    const retrievedUser = await userRepo.getUserById(savedUser._id);

    expect(retrievedUser).not.toBeNull();
    if (retrievedUser) {
      expect(retrievedUser.email).toBe(updatedData.email);
    }
  });

  it("should delete a user", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    const savedUser = await userRepo.createUser(userData);

    await userRepo.deleteUser(savedUser._id);

    const retrievedUser = await userRepo.getUserById(savedUser._id);

    expect(retrievedUser).toBeNull();
  });
});
