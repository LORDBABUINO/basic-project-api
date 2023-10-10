import { Request, Response } from 'express';

import logger from '../../logger';
import HttpError from '../error/HttpError';
import UserService from '../services/UserService';
import UserValidator from '../validators/UserValidator';

class AuthController {
  async store(
    req: Request,
    res: Response<{ message: string } | LoginResponse>
  ): Promise<Response<{ message: string } | LoginResponse>> {
    try {
      UserValidator.isValidLoginRequest(req.body);
      const response = await new UserService().checkLogin(req.body);
      return res.status(200).json(response);
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

export default new AuthController();
