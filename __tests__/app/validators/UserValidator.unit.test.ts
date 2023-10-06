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
    ).toThrow('Missing required fields: fullname');
  });

  it('should throw an error when email is missing', () => {
    const userRequestWithoutEmail = {
      fullname: 'John Doe',
      password: 'securePassword123',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithoutEmail)
    ).toThrow('Missing required fields: email');
  });

  it('should throw an error when password is missing', () => {
    const userRequestWithoutPassword = {
      fullname: 'John Doe',
      email: 'johndoe@example.com',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithoutPassword)
    ).toThrow('Missing required fields: password');
  });

  it('should throw an error when multiple required fields are missing', () => {
    const userRequestWithoutMultipleFields = {
      email: 'johndoe@example.com',
    };

    expect(() =>
      UserValidator.isValidUserRequest(userRequestWithoutMultipleFields)
    ).toThrow('Missing required fields: fullname, password');
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
});
