import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/userModel';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  // Получение всех пользователей
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAll();
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
