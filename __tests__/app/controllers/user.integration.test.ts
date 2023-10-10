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
  it('POST: Should save User on database', async () => {
    const mock = {
      fullname: 'john test',
      email: 'john@test.com',
      password: 'passwordTest',
    };
    const res = await request(app).post('/users').send(mock);
    const data = await AppDataSource.getRepository(User).find();
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(expect.any(User));
    expect(data[0]).toEqual(
      expect.objectContaining({
        fullname: mock.fullname,
        email: mock.email,
        password: expect.any(String),
      })
    );
    expect(res.status).toEqual(201);
  });
  it("POST: Should NOT save User on database if there' another user with the same email", async () => {
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
    const res1 = await request(app).post('/users').send(mock);
    const res2 = await request(app).post('/users').send(mock2);
    const data = await AppDataSource.getRepository(User).find();
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(expect.any(User));
    expect(data[0]).toEqual(
      expect.objectContaining({
        fullname: mock.fullname,
        email: mock.email,
        password: expect.any(String),
      })
    );
    expect(res1.status).toEqual(201);
    expect(res2.status).toEqual(400);
    expect(res2.body.message).toContain('User[john@test.com] already exists');
  });
  it('POST: Should return a 400 Bad Request and an error message for missing required fields', async () => {
    const res = await request(app).post('/users').send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      'Invalid parameter type: fullname, email, password must be a string.'
    );
  });
  it('POST: Should create a log entry when registering a user', async () => {
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
  it('POST: Should store user password as hash in database', async () => {
    const testUser = {
      fullname: 'testuser',
      email: 'test@example.com',
      password: 'securePassword123',
    };

    const registrationResponse = await request(app)
      .post('/users')
      .send(testUser);

    expect(registrationResponse.status).toBe(201);

    const retrievedUser = await AppDataSource.getRepository(User).findOne({
      where: { email: testUser.email },
    });

    expect(retrievedUser?.password).not.toBeNull();
    expect(retrievedUser?.password).not.toBe(testUser.password);
  });
});
