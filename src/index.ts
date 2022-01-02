import * as dotenv from 'dotenv';
import {logger} from './utils/customLogger';
import {handleUncaughtError} from './error-hander/errorHandlers';
import sq from './utils/sequelize';
import app from './app';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

sq.sync().then(() => {
  logger('ok');
});

const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  logger(`Listening on port ${PORT}`);
});


process.on('uncaughtException', handleUncaughtError);
process.on('unhandledRejection', handleUncaughtError);
