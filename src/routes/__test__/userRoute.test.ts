import request from "supertest";
import app from "../../index"; // Import your Express application

describe("User Routes", () => {
  // Test for GET all users route
  describe("GET /", () => {
    it("should respond with status code 200", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });
});
