import AppDataSource from '../../database';
import HttpError from '../error/HttpError';
import User from '../models/User';

interface Request {
  fullname: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ fullname, email, password }: Request): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new HttpError('User already exists', 400);
    }
    const user = userRepository.create({
      fullname,
      email,
      password,
    });
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
