import { Client } from 'pg';

const client = new Client({
  user: 'kong',
  host: '192.168.8.111',
  database: 'gpt',
  password: 'Zxcvbnm1=',
  port: 5432,
});

client.connect().catch((err) => console.error('Database connection error', err));

export default client;
