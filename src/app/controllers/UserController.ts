import { Request, Response } from 'express';

import HttpError from '../error/HttpError';
import CreateUserService from '../services/CreateUserService';

class UserController {
  async store(req: Request, res: Response) {
    try {
      const { fullname, email, password } = req.body;
      await new CreateUserService().execute({ fullname, email, password });
      return res.status(201).end();
    } catch (error) {
      console.error(error);
      return res.status((error as HttpError).status ?? 500).json(error);
    }
  }
}

export default new UserController();
