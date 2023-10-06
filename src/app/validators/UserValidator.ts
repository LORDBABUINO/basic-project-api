import HttpError from '../error/HttpError';

export default class UserValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isValidUserRequest(body: any): asserts body is UserRequest {
    if (
      typeof body.fullname !== 'string' ||
      typeof body.email !== 'string' ||
      typeof body.password !== 'string'
    )
      throw new HttpError(
        `Invalid parameter type: ${[
          ...(typeof body?.fullname === 'string' ? [] : ['fullname']),
          ...(typeof body?.email === 'string' ? [] : ['email']),
          ...(typeof body?.password === 'string' ? [] : ['password']),
        ].join(', ')} must be a string.`,
        400
      );
    if (body?.password.length < 8)
      throw new HttpError('Password must be at least 8 characters long', 400);
    if (
      !/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/.test(
        body.email
      )
    )
      throw new HttpError('Invalid email format', 400);
  }
}
