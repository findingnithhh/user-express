import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/userService";
import StatusCodes from "../utils/const/statusCode";

const userService = new UserService();

export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      if (users.length > 0) {
        res.json({
          status: "success",
          message: "Users are founded",
          data: users,
        });
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
      const user = await userService.getUserById(userId);
      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND.code)
          .json({ Status: StatusCodes.NOT_FOUND });
      } else {
        res
          .status(StatusCodes.FOUND.code)
          .json({ data: user, Status: StatusCodes.FOUND });
      }
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR.code)
        .json({ error: StatusCodes.INTERNAL_SERVER_ERROR });
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;
    try {
      const user = await userService.createUser(userData);
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
      const user = await userService.updateUser(userId, updatedUserData);
      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND.code)
          .json({ message: StatusCodes.NOT_FOUND });
      } else {
        res
          .status(StatusCodes.OK.code)
          .json({ data: user, Status: StatusCodes.OK });
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
      const user = await userService.deleteUser(userId);
      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND.code)
          .json({ Status: StatusCodes.NOT_FOUND });
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
