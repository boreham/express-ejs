import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

// Список пользователей
router.get('/', (req, res) => userController.getAll(req, res));

// Форма для добавления пользователя
router.get('/create', (req, res) => userController.createForm(req, res));

// Создание пользователя
router.post('/', (req, res) => userController.create(req, res));

// Форма для редактирования пользователя
router.get('/:id', (req, res) => userController.getById(req, res));

// Обновление пользователя
router.post('/:id/update', (req, res) => userController.update(req, res));

// Удаление пользователя
router.post('/:id/delete', (req, res) => userController.delete(req, res));

export default router;
