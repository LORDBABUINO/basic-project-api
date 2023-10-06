import request from 'supertest';

import User from '../../../src/app/models/User';
import AppDataSource from '../../../src/database';
import logger from '../../../src/logger';
import app from '../../../src/start/app';

describe('/users', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  afterAll(async () => {
    await AppDataSource.destroy();
  });
  beforeEach(async () => {
    await Promise.all(
      AppDataSource.entityMetadatas.map(async ({ name }) => {
        await AppDataSource.getRepository(name).clear();
      })
    );
  });
  afterEach(async () => {
    await AppDataSource.getRepository(User).clear();
  });
  it('Should save User on database (route: POST )', async () => {
    const mock = {
      fullname: 'john test',
      email: 'john@test.com',
      password: 'passwordTest',
    };
    const res = await request(app).post('/users').send(mock);
    const data = await AppDataSource.getRepository(User).find();
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(expect.any(User));
    expect(data[0]).toEqual(expect.objectContaining(mock));
    expect(res.status).toEqual(201);
  });
  it("Should NOT save User on database if there' another user with the same email(route: POST )", async () => {
    const mock = {
      fullname: 'john test',
      email: 'john@test.com',
      password: 'passwordTest',
    };
    const mock2 = {
      fullname: 'john test2',
      email: 'john@test.com',
      password: 'passwordTest2',
    };
    const res = await Promise.all([
      request(app).post('/users').send(mock),
      request(app).post('/users').send(mock2),
    ]);
    const statusArray = res.map(({ status }) => status);
    const messageArray = res.map(({ body: { message } }) => message);
    const data = await AppDataSource.getRepository(User).find();
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(expect.any(User));
    expect(statusArray).toContain(201);
    expect(statusArray).toContain(400);
    expect(messageArray).toContain('User[john@test.com] already exists');
  });
  it('Should return a 400 Bad Request and an error message for missing required fields', async () => {
    const res = await request(app).post('/users').send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      'Invalid parameter type: fullname, email, password must be a string.'
    );
  });
  it('Should create a log entry when registering a user', async () => {
    const userData = {
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      password: 'securePassword123',
    };
    logger.info = jest.fn();

    await request(app).post('/users').send(userData);

    expect(logger.info).toHaveBeenCalledWith(
      'User registered: johndoe@example.com'
    );
  });
});
