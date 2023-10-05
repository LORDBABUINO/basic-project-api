import request from 'supertest';

import User from '../../../src/app/models/User';
import AppDataSource from '../../../src/database';
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
});
