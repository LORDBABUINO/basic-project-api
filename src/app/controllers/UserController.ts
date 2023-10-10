import { Request, Response } from 'express';

import logger from '../../logger';
import HttpError from '../error/HttpError';
import CreateUserService from '../services/CreateUserService';
import UserValidator from '../validators/UserValidator';

class UserController {
  async store(
    req: Request,
    res: Response<{ message: string } | undefined>
  ): Promise<Response<{ message: string } | undefined>> {
    try {
      UserValidator.isValidUserRequest(req.body);
      await new CreateUserService().create(req.body);
      return res.status(201).end();
    } catch (error) {
      logger.error((error as Error)?.message ?? error);
      return (error as HttpError).status
        ? res
            .status((error as HttpError).status)
            .json({ message: (error as Error).message })
        : res.status(500).json({ message: (error as Error)?.message ?? error });
    }
  }
}

export default new UserController();
