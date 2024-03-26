import request from "supertest";
import mongoose, { ConnectOptions } from "mongoose";
import app from "../../index"; // Import your Express application
import { MongoMemoryServer } from "mongodb-memory-server";

describe("User Routes", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start(); // Start the server
    const mongoUri = mongoServer.getUri(); // No need to await here
    await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
    } as ConnectOptions);
  });


  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Test for GET all users route
  describe("GET /", () => {
    it("should respond with status code 200", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });

  // Test for POST user route
  describe("POST /user", () => {
    it("should create a new user and respond with status code 201", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const response = await request(app).post("/user").send(userData);

      expect(response.statusCode).toBe(201);
      // You can add more assertions here if needed
    });
  });
});
