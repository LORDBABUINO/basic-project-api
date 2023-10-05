import 'reflect-metadata';

import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/app/models/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

export default AppDataSource;
