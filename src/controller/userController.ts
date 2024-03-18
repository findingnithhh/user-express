import express, { Request, Response, NextFunction } from "express";
import { User } from "../models/user"; // Assuming User model is defined elsewhere
import StatusCodes from "../utils/const/statusCode";
export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find({});
      if (users.length > 0) {
        res.json({ status: "success", message: "Users found", data: users });
      } else {
        res
          .status(StatusCodes.NOT_FOUND.code)
          .json({ message: "No Users Found" });
      }
    } catch (err: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR.code)
        .json({ error: err.message });
    }
  },
  getUserById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId: string = req.params.userId;
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(StatusCodes.NOT_FOUND.code).json({
          Status: StatusCodes.NOT_FOUND,
        });
      } else {
        res.status(StatusCodes.FOUND.code).json({
          data: user,
          Status: StatusCodes.FOUND,
        });
      }
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
        error: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;
    const newUser = new User(userData);

    try {
      const user = await newUser.save();
      res.status(StatusCodes.CREATED.code).json({
        data: user,
        StatusCode: StatusCodes.CREATED.code,
        Message: StatusCodes.CREATED.message,
      });
    } catch (err: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR.code)
        .json({ error: err.message });
    }
  },

  updateUser: async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.userId;
    const updatedUserData = req.body;

    try {
      const user = await User.findByIdAndUpdate(userId, updatedUserData, {
        new: true,
      });
      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND.code)
          .json({ message: StatusCodes.NOT_FOUND });
      } else {
        res.status(StatusCodes.OK.code).json({
          data: user,
          Status: StatusCodes.OK,
        });
      }
    } catch (err: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR.code)
        .json({ error: err.message });
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.userId;

    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        res.status(StatusCodes.NOT_FOUND.code).json({
          Status: StatusCodes.NOT_FOUND,
        });
      } else {
        res
          .status(StatusCodes.OK.code)
          .json({
            StatusCode: StatusCodes.OK.code,
            Message: StatusCodes.OK.message,
          })
          .end();
      }
    } catch (err: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR.code)
        .json({ error: err.message });
    }
  },
};
