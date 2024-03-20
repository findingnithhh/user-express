import { UserRepo } from "../database/repository/userRepo";

export class UserService {
  private userRepository: UserRepo;

  constructor() {
    this.userRepository = new UserRepo();
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(userId: string) {
    return await this.userRepository.getUserById(userId);
  }

  async createUser(userData: any) {
    return await this.userRepository.createUser(userData);
  }

  async updateUser(userId: string, updatedUserData: any) {
    return await this.userRepository.updateUser(userId, updatedUserData);
  }

  async deleteUser(userId: string) {
    return await this.userRepository.deleteUser(userId);
  }
}