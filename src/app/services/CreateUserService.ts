import bcrypt from 'bcrypt';

import AppDataSource from '../../database';
import logger from '../../logger';
import HttpError from '../error/HttpError';
import User from '../models/User';

class CreateUserService {
  public async create({
    fullname,
    email,
    password,
  }: UserRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new HttpError(`User[${email}] already exists`, 400);
    }
    const user = userRepository.create({
      fullname,
      email,
      password: await bcrypt.hash(password, 10),
    });
    await userRepository.save(user);
    logger.info(`User registered: ${email}`);
    return user;
  }
}

export default CreateUserService;
