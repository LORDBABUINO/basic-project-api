import { Router } from 'express';

import UserController from './app/controllers/UserController';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Hello world!' });
});
router.post('/users', UserController.store);

export default router;
