import UserValidator from '../../../src/app/validators/UserValidator';

describe('simple test', () => {
  it('should not throw an error when all required fields are present', () => {
    const validUserRequest = {
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      password: 'securePassword123',
    };

    expect(() =>
      UserValidator.isValidUserRequest(validUserRequest)
    ).not.toThrow();
  });

  it('should throw an error when fullname is missing', () => {
    const userRequestWithoutFullname = {
      email: 'johndoe@example.com',
      password: 'securePassword123',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithoutFullname)
    ).toThrow('Invalid parameter type: fullname must be a string.');
  });

  it('should throw an error when email is missing', () => {
    const userRequestWithoutEmail = {
      fullname: 'John Doe',
      password: 'securePassword123',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithoutEmail)
    ).toThrow('Invalid parameter type: email must be a string.');
  });

  it('should throw an error when password is missing', () => {
    const userRequestWithoutPassword = {
      fullname: 'John Doe',
      email: 'johndoe@example.com',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithoutPassword)
    ).toThrow('Invalid parameter type: password must be a string.');
  });

  it('should throw an error when multiple required fields are missing', () => {
    const userRequestWithoutMultipleFields = {
      email: 'johndoe@example.com',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithoutMultipleFields)
    ).toThrow('Invalid parameter type: fullname, password must be a string.');
  });
  it('should throw an error when password is shorter than 8 characters', () => {
    const userRequestWithWeakPassword = {
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      password: 'weak',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithWeakPassword)
    ).toThrow('Password must be at least 8 characters long');
  });
  it('should throw an error when fullname is not a string', () => {
    const userRequestWithInvalidFullname = {
      fullname: 123,
      email: 'johndoe@example.com',
      password: 'securePassword123',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithInvalidFullname)
    ).toThrow('Invalid parameter type: fullname must be a string.');
  });

  it('should throw an error when email is not a string', () => {
    const userRequestWithInvalidEmail = {
      fullname: 'John Doe',
      email: 123,
      password: 'securePassword123',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithInvalidEmail)
    ).toThrow('Invalid parameter type: email must be a string.');
  });

  it('should throw an error when password is not a string', () => {
    const userRequestWithInvalidPassword = {
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      password: true,
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithInvalidPassword)
    ).toThrow('Invalid parameter type: password must be a string.');
  });
});
