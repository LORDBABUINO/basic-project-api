import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AppDataSource from '../../database';
import logger from '../../logger';
import HttpError from '../error/HttpError';
import User from '../models/User';

class UserService {
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

  public async checkLogin({
    email,
    password,
  }: LoginRequest): Promise<LoginResponse> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
      select: ['id', 'fullname', 'email', 'password'],
    });
    if (!user) {
      throw new HttpError(`User[${email}] do NOT exists`, 400);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpError(`User[${email}] used invalid credentials`, 401);
    }
    logger.info(`User logged in: ${email}`);
    return {
      token: jwt.sign(
        { id: user.id, fullname: user.fullname, email },
        process.env.JWT_SECRET ?? ''
      ),
    };
  }
}

export default UserService;
