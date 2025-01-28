import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';
import dbClient from '../config/db';

const userRepository = new UserRepository(dbClient);
const userService = new UserService(userRepository);

export class UserController {
  // Получение всех пользователей
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.render('userList', { users });
    } catch (error) {
      res.status(500).send('Error retrieving users');
    }
  }

  // Показ формы для создания пользователя
  createForm(req: Request, res: Response): void {
    res.render('userForm', { user: { name: '', email: '' } });
  }

  // Создание пользователя
  async create(req: Request, res: Response): Promise<void> {
    const { name, email }: { name: string; email: string } = req.body;
    const user = { name, email };

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
        res.render('userForm', { user });
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
