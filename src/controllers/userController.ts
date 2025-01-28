import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';
import dbClient from '../config/db';

const userRepository = new UserRepository(dbClient);
const userService = new UserService(userRepository);

export class UserController {
  // Получение всех пользователей
  async getAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;  // Получаем номер страницы
    const pageSize = 5;  // Количество пользователей на одной странице
    const sortBy = req.query.sortBy as string || 'id';  // Поле для сортировки (по умолчанию - id)
    const sortOrder = req.query.sortOrder as string || 'asc';  // Порядок сортировки (по умолчанию - по возрастанию)

    try {
      const { users, totalUsers, totalPages, currentPage } = await userService.getAllUsers(page, pageSize, sortBy, sortOrder);
      res.render('userList', { 
        users,
        totalUsers,
        totalPages,
        currentPage,
        pageSize,
        sortBy,
        sortOrder
      });
    } catch (error) {
      res.status(500).send('Error retrieving users');
    }
  }

  // Показ формы для создания пользователя
  createForm(req: Request, res: Response): void {
    res.render('userForm', { user: { name: '', email: '' }, error: null });
  }

  // Создание пользователя
  async create(req: Request, res: Response): Promise<void> {
    const { name, email }: { name: string; email: string } = req.body;
    const user = { name, email };

    // Валидация на сервере
    const errors: { name?: string, email?: string } = {};

    if (!name || name.length < 3 || name.length > 50) {
      errors.name = 'Name must be between 3 and 50 characters.';
    }

    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    if (Object.keys(errors).length > 0) {
      return res.render('userForm', { user, error: errors });
    }

    try {
      const newUser = await userService.createUser(user);
      res.redirect('/users');
    } catch (error) {
      res.status(500).send('Error creating user');
    }
  }

  // Получение пользователя по ID
  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await userService.getUserById(id);
      if (user) {
        res.render('userForm', { user, error: null });
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('Error retrieving user');
    }
  }

  // Обновление пользователя
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const { name, email }: { name: string; email: string } = req.body;
    const user = { name, email };

    // Валидация на сервере
    const errors: { name?: string, email?: string } = {};

    if (!name || name.length < 3 || name.length > 50) {
      errors.name = 'Name must be between 3 and 50 characters.';
    }

    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    if (Object.keys(errors).length > 0) {
      return res.render('userForm', { user, error: errors });
    }

    try {
      const updatedUser = await userService.updateUser(id, user);
      if (updatedUser) {
        res.redirect('/users');
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('Error updating user');
    }
  }

  // Удаление пользователя
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const isDeleted = await userService.deleteUser(id);
      if (isDeleted) {
        res.redirect('/users');
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('Error deleting user');
    }
  }
}
