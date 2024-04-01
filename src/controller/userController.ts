import { Request, Response } from "express";
import { UserService } from "../service/userService";
import StatusCodes from "../utils/const/statusCode";
// import { sendVerificationEmail } from "../utils/userEmailService";
import { generateEmailVerificationToken, saveToken } from "../service/tokenService";
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
  limit?: number;
  page?: number;
  username?: string;
}

@Route("user")
export class UserController {
  @Get("/")
  public async getAllUsers(@Queries() queryParams: QueryParams): Promise<any> {
    try {
      const pageNumber = queryParams.page ? queryParams.page : 1;
      const pageSize = queryParams.limit ? queryParams.limit : 10;
      const nameFilter =
        queryParams.username !== null && queryParams.username !== undefined
          ? queryParams.username
          : "";

      const users = await userService.getAllUsers(
        pageNumber as number,
        pageSize as number,
        nameFilter // Passing name filter to userService.getAllUsers function
      );

      const totalCount = await userService.getUserCount();
      const totalPages = Math.ceil((totalCount / pageSize) as number);

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

  // @Post("/")
  // public async createUser(@Body() requestBody: any): Promise<any> {
  //   try {
  //     const user = await userService.createUser(requestBody);

  //     // Generate verification link
  //     const verificationLink = `https://www.youtube.com/`;

  //     // Send verification email
  //     await sendVerificationEmail(user.email, verificationLink);

  //     return {
  //       status: "success",
  //       message: "User created successfully. Verification email sent.",
  //       data: user,
  //     };
  //   } catch (err: any) {
  //     throw new Error(err.message);
  //   }
  // }
  @Post("/")
  public async createUser(@Body() requestBody: any): Promise<any> {
    try {
      const user = await userService.createUser(requestBody);

      // Generate verification token
      const token = generateEmailVerificationToken(user.id);

      // Save token
      await saveToken(user.id, token);

      // Generate verification link (assuming you have a route for verification)
      const verificationLink = `https://www.example.com/verify?token=${token}`;

      return {
        status: "success",
        message: "User created successfully. Verification email sent.",
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
