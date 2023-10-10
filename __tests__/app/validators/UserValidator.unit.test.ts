import HttpError from '../../../src/app/error/HttpError';
import UserValidator from '../../../src/app/validators/UserValidator';

describe('UserValidator', () => {
  describe('isValidUserRequest', () => {
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
      ).toThrow(
        new HttpError('Invalid parameter type: fullname must be a string.', 400)
      );
    });

    it('should throw an error when email is missing', () => {
      const userRequestWithoutEmail = {
        fullname: 'John Doe',
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithoutEmail)
      ).toThrow(
        new HttpError('Invalid parameter type: email must be a string.', 400)
      );
    });

    it('should throw an error when password is missing', () => {
      const userRequestWithoutPassword = {
        fullname: 'John Doe',
        email: 'johndoe@example.com',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithoutPassword)
      ).toThrow(
        new HttpError('Invalid parameter type: password must be a string.', 400)
      );
    });

    it('should throw an error when multiple required fields are missing', () => {
      const userRequestWithoutMultipleFields = {
        email: 'johndoe@example.com',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithoutMultipleFields)
      ).toThrow(
        new HttpError(
          'Invalid parameter type: fullname, password must be a string.',
          400
        )
      );
    });
    it('should throw an error when password is shorter than 8 characters', () => {
      const userRequestWithWeakPassword = {
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        password: 'weak',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithWeakPassword)
      ).toThrow(
        new HttpError('Password must be at least 8 characters long', 400)
      );
    });
    it('should throw an error when fullname is not a string', () => {
      const userRequestWithInvalidFullname = {
        fullname: 123,
        email: 'johndoe@example.com',
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithInvalidFullname)
      ).toThrow(
        new HttpError('Invalid parameter type: fullname must be a string.', 400)
      );
    });

    it('should throw an error when email is not a string', () => {
      const userRequestWithInvalidEmail = {
        fullname: 'John Doe',
        email: 123,
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithInvalidEmail)
      ).toThrow(
        new HttpError('Invalid parameter type: email must be a string.', 400)
      );
    });

    it('should throw an error when password is not a string', () => {
      const userRequestWithInvalidPassword = {
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        password: true,
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithInvalidPassword)
      ).toThrow(
        new HttpError('Invalid parameter type: password must be a string.', 400)
      );
    });
    it('should throw an error when the email is missing the "@" symbol', () => {
      const userRequestWithInvalidEmail = {
        fullname: 'John Doe',
        email: 'johndoexample.com', // Invalid format, missing "@" symbol
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithInvalidEmail)
      ).toThrow(new HttpError('Invalid email format', 400));
    });

    it('should throw an error when the email is missing the domain part', () => {
      const userRequestWithInvalidEmail = {
        fullname: 'John Doe',
        email: 'johndoe@', // Invalid format, missing domain part
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithInvalidEmail)
      ).toThrow(new HttpError('Invalid email format', 400));
    });

    it('should throw an error when the email contains spaces', () => {
      const userRequestWithInvalidEmail = {
        fullname: 'John Doe',
        email: 'john doe@example.com', // Invalid format, contains spaces
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidUserRequest(userRequestWithInvalidEmail)
      ).toThrow(new HttpError('Invalid email format', 400));
    });
  });
  describe('isValidLoginRequest', () => {
    it('should not throw an error when email and password are strings', () => {
      const validLoginRequest = {
        email: 'user@example.com',
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidLoginRequest(validLoginRequest)
      ).not.toThrow();
    });

    it('should throw an error when email is missing', () => {
      const loginRequestWithMissingEmail = {
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidLoginRequest(loginRequestWithMissingEmail)
      ).toThrow(
        new HttpError('Invalid parameter type: email must be a string.', 400)
      );
    });

    it('should throw an error when password is missing', () => {
      const loginRequestWithMissingPassword = {
        email: 'user@example.com',
      };

      expect(() =>
        UserValidator.isValidLoginRequest(loginRequestWithMissingPassword)
      ).toThrow(
        new HttpError('Invalid parameter type: password must be a string.', 400)
      );
    });

    it('should throw an error when email is not a string', () => {
      const loginRequestWithInvalidEmail = {
        email: 123,
        password: 'securePassword123',
      };

      expect(() =>
        UserValidator.isValidLoginRequest(loginRequestWithInvalidEmail)
      ).toThrow(
        new HttpError('Invalid parameter type: email must be a string.', 400)
      );
    });

    it('should throw an error when password is not a string', () => {
      const loginRequestWithInvalidPassword = {
        email: 'user@example.com',
        password: 123,
      };

      expect(() =>
        UserValidator.isValidLoginRequest(loginRequestWithInvalidPassword)
      ).toThrow(
        new HttpError('Invalid parameter type: password must be a string.', 400)
      );
    });
  });
});
