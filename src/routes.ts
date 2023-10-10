import { Router } from 'express';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Hello world!' });
});
router.post('/users', UserController.store);
router.post('/auth', AuthController.store);

export default router;
