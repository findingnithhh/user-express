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
          message: "Users are found",
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

  @Post("/")
  public async createUser(@Body() requestBody: any): Promise<any> {
    try {
      const user = await userService.createUser(requestBody);
      return {
        status: "success",
        message: "User created successfully",
        data: user,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Put("/{userId}")
  public async updateUser(
    @Path() userId: string,
    @Body() updatedUserData: any
  ): Promise<any> {
    try {
      const user = await userService.updateUser(userId, updatedUserData);
      if (!user) {
        throw new Error("User not found");
      } else {
        return {
          status: "success",
          message: "User updated successfully",
          data: user,
        };
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Delete("/{userId}")
  public async deleteUser(@Path() userId: string): Promise<any> {
    try {
      const user = await userService.deleteUser(userId);
      if (!user) {
        throw new Error("User not found");
      } else {
        return {
          status: "success",
          message: "User deleted successfully",
          data: user,
        };
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
