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
  }
}
