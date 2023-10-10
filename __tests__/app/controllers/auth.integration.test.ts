import request from 'supertest';

import AppDataSource from '../../../src/database';
import app from '../../../src/start/app';

describe('/auth', () => {
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
  it('POST: Should log in a user with valid credentials', async () => {
    const user = {
      fullname: 'john test',
      email: 'john@test.com',
      password: 'passwordTest',
    };

    await request(app).post('/users').send(user);

    const response = await request(app).post('/auth').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
  });
  it('POST: Should NOT log in a user with INvalid credentials', async () => {
    const user = {
      fullname: 'john test',
      email: 'john@test.com',
      password: 'passwordTest',
    };

    await request(app).post('/users').send(user);

    const response = await request(app).post('/auth').send({
      email: user.email,
      password: 'wrongPassword',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual(
      `User[${user.email}] used invalid credentials`
    );
  });
});
