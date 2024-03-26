// userController.ts

import { Request, Response } from "express";
import { UserService } from "../service/userService";
import StatusCodes from "../utils/const/statusCode";
import {
  Route,
  Get,
  Post,
  Put,
  Delete,
  Request as TRequest,
  Response as TResponse,
  Path,
  Body,
} from "tsoa";

const userService = new UserService();

@Route("user")
export class UserController {
  @Get("/")
  public async getAllUsers(): Promise<any> {
    try {
      const users = await userService.getAllUsers();
      if (users.length > 0) {
        return {
          status: "success",
          message: "Users are founded",
          data: users,
        };
      } else {
        return {
          status: "success",
          message: "No Users Found",
          data: [],
        };
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Get("/{userId}")
  public async getUserById(@Path() userId: string): Promise<any> {
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      } else {
        return {
          data: user,
        };
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  // @Post("/")
  // public async createUser(@Body() requestBody: any): Promise<void> {
  //   try {
  //     const user = await userService.createUser(requestBody);
  //     res.status(StatusCodes.CREATED.code).json({
  //       data: user,
  //       StatusCode: StatusCodes.CREATED.code,
  //       Message: StatusCodes.CREATED.message,
  //     });
  //   } catch (err: any) {
  //     res
  //       .status(StatusCodes.INTERNAL_SERVER_ERROR.code)
  //       .json({ error: err.message });
  //   }
  // }

  // @Put("/:userId")
  // public async updateUser(
  //   @TRequest() req: Request,
  //   userId: string
  // ): Promise<any> {
  //   const updatedUserData = req.body; // Extract body directly from req
  //   try {
  //     const user = await userService.updateUser(userId, updatedUserData);
  //     if (!user) {
  //       throw new Error("User not found");
  //     } else {
  //       return {
  //         data: user,
  //       };
  //     }
  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }

  // @Delete("/:userId")
  // public async deleteUser(
  //   @TRequest() req: Request,
  //   userId: string
  // ): Promise<any> {
  //   try {
  //     const user = await userService.deleteUser(userId);
  //     if (!user) {
  //       throw new Error("User not found");
  //     } else {
  //       return {
  //         status: "success",
  //         message: "User deleted successfully",
  //         data: user,
  //       };
  //     }
  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }
}
