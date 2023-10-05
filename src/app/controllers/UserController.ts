import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class UserController {
  async store(req: Request, res: Response) {
    try {
      const { fullname, email, password } = req.body;
      await new CreateUserService().execute({ fullname, email, password });
      return res.status(201).end();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}

export default new UserController();
