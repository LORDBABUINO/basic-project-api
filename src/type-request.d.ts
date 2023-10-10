interface UserRequest {
  fullname: string;
  email: string;
  password: string;
}

type LoginRequest = Pick<User, 'email' | 'password'>;

type LoginResponse = {
  token: string;
};
