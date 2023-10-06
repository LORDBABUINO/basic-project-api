import HttpError from '../error/HttpError';

export default class UserValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isValidUserRequest(body: any): asserts body is UserRequest {
    if (!(body?.fullname && body?.email && body?.password))
      throw new HttpError(
        `Missing required fields: ${[
          ...(body?.fullname ? [] : ['fullname']),
          ...(body?.email ? [] : ['email']),
          ...(body?.password ? [] : ['password']),
        ].join(', ')}`,
        400
      );
    if (body?.password.length < 8)
      throw new HttpError('Password must be at least 8 characters long', 400);
  }
}
