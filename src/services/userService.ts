import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/userModel';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  // Получение всех пользователей
  async getAllUsers(page: number, pageSize: number, sortBy: string, sortOrder: string): Promise<any> {
    const users = await this.userRepository.getAllUsers(page, pageSize, sortBy, sortOrder);
    const totalUsers = await this.userRepository.countUsers();
    const totalPages = Math.ceil(totalUsers / pageSize);

    return {
      users,
      totalUsers,
      totalPages,
      currentPage: page
    };
  }

  // Создание нового пользователя
  async createUser(user: User): Promise<User> {
    if (!user.name || !user.email) {
      throw new Error('Name and email are required');
    }
    return await this.userRepository.create(user);
  }

  // Получение пользователя по ID
  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.getById(id);
  }

  // Обновление пользователя
  async updateUser(id: number, user: User): Promise<User | null> {
    return await this.userRepository.update(id, user);
  }

  // Удаление пользователя
  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
