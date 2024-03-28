import { Request, Response } from "express";
import { UserService } from "../service/userService";
import StatusCodes from "../utils/const/statusCode";
import {
  Query,
  Route,
  Get,
  Post,
  Put,
  Delete,
  Path,
  Body,
  Queries,
} from "tsoa";

const userService = new UserService();

interface QueryParams {
  limit?: string;
  page?: string;
}

@Route("user")
export class UserController {
  @Get("/")
  public async getAllUsers(@Queries() queryParams: QueryParams): Promise<any> {
    try {
      const pageNumber = queryParams ? parseInt(queryParams.page as string) : 1;
      const pageSize = queryParams ? parseInt(queryParams.limit as string) : 10;

      const users = await userService.getAllUsers(pageNumber, pageSize);

      const totalCount = await userService.getUserCount();
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        status: "success",
        message: "Users are found",
        data: users,
        meta: {
          page: pageNumber,
          limit: pageSize,
          total: totalCount,
          totalPages: totalPages,
        },
      };
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
