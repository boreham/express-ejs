import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import userRoutes from './routes/userRoutes';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();

// Настройка EJS как шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

// Middleware для обработки тела запроса
app.use(bodyParser.urlencoded({ extended: true }));

// Маршруты для пользователей
app.use('/users', userRoutes);

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
