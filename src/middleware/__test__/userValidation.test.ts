import { Request, Response, NextFunction } from "express";
import { validateUser } from "../userValidation";
import {User} from '../../database/models/user';

// Mocking the User.findOne method
jest.mock("../../database/models/user", () => ({
  User: {
    findOne: jest.fn(),
  },
}));

describe("validateUser middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should pass validation and call next middleware for valid user data", async () => {
    await validateUser(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return 400 if email is already registered", async () => {
    // Mocking findOne to simulate existing user
    (User.findOne as jest.Mock).mockResolvedValueOnce({
      email: req.body.email,
    });

    await validateUser(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "This email is already in used",
    });
  });

 it("should return 400 if email is already registered", async () => {
   // Mocking findOne to simulate existing user
   (User.findOne as jest.Mock).mockResolvedValueOnce({
     email: req.body.email,
   });

   await validateUser(req as Request, res as Response, next);
   expect(res.status).toHaveBeenCalledWith(400);
   expect(res.json).toHaveBeenCalledWith({
     message: "This email is already in used", // Fix typo here
   });
 });


  // Add more test cases to cover other scenarios as needed
});
