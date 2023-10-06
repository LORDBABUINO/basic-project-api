import { Request, Response } from 'express';

import HttpError from '../error/HttpError';
import CreateUserService from '../services/CreateUserService';
import UserValidator from '../validators/UserValidator';

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      UserValidator.isValidUserRequest(req.body);
      await new CreateUserService().create(req.body);
      return res.status(201).end();
    } catch (error) {
      console.error(error);
      return (error as HttpError).status
        ? res
            .status((error as HttpError).status)
            .json({ message: (error as Error).message })
        : res.status(500).json({ error });
    }
  }
}

export default new UserController();
