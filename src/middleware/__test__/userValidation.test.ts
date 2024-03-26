// import { validateUser } from "./middleware"; // Assuming your middleware file is named middleware.ts
import { validateUser } from "../userValidation";
import { Request, Response, NextFunction } from "express";

describe("validateUser middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  // Valid User Data Test
  test("should call next() if user data is valid", () => {
    req.body = {
      username: "testuser",
      email: "test@example.com",
      password: "securepassword",
    };

    validateUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  //   Username Too Short Test:
  test("should respond with 400 if username is too short", () => {
    req.body = {
      username: "us",
      email: "test@example.com",
      password: "securepassword",
    };

    validateUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: ["Username must be at least 3 characters long"],
    });
  });

  //Invalid Email Test
  test("should respond with 400 if email is invalid", () => {
    req.body = {
      username: "testuser",
      email: "invalidemail",
      password: "securepassword",
    };

    validateUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: ["Invalid email address"],
    });
  });

  //Password Too Short Test:
  test("should respond with 400 if password is too short", () => {
    req.body = {
      username: "testuser",
      email: "test@example.com",
      password: "weak",
    };

    validateUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: ["Passwod not strong please give at least 8 characters"],
    });
  });

});
