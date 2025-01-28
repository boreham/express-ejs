import { Client, QueryResult } from 'pg';
import { User } from '../models/userModel';

export class UserRepository {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  // Получение всех пользователей
  async getAll(): Promise<User[]> {
    const result: QueryResult = await this.client.query('SELECT * FROM users');
    return result.rows;
  }

  // Создание пользователя
  async create(user: User): Promise<User> {
    const result: QueryResult = await this.client.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [user.name, user.email]
    );
    return result.rows[0];
  }

  // Получение пользователя по ID
  async getById(id: number): Promise<User | null> {
    const result: QueryResult = await this.client.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  // Обновление пользователя
  async update(id: number, user: User): Promise<User | null> {
    const result: QueryResult = await this.client.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [user.name, user.email, id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  // Удаление пользователя
  async delete(id: number): Promise<boolean> {
    const result: QueryResult = await this.client.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return result.rowCount !== undefined;
  }
}
