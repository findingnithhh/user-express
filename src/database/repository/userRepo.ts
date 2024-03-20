import { User } from "../models/user";

export class UserRepo {
  async getAllUsers() {
    return await User.find({});
  }

  async getUserById(userId: string) {
    return await User.findById(userId);
  }

  async createUser(userData: any) {
    const newUser = new User(userData);
    return await newUser.save();
  }

  async updateUser(userId: string, updatedUserData: any) {
    return await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  }

  async deleteUser(userId: string) {
    return await User.findByIdAndDelete(userId);
  }
}