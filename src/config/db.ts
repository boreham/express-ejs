import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Загружаем параметры из .env файла
dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

// Экспортируем client как default
export default client;
