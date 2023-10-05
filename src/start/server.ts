import 'reflect-metadata';

import AppDataSource from '../database';
import app from './app';

(async () => {
  const port = parseInt(process.env.APP_PORT as string, 10) || 5432;

  try {
    await AppDataSource.initialize();
    // eslint-disable-next-line no-console
    console.log('\x1b[34m%s\x1b[0m', '=>   Database connected!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      '\x1b[33m%s\x1b[0m',
      `=> 🚀 Server running on the port: ${port}`
    );
  });
})();
