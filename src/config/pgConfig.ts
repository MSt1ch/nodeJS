import dotenv from 'dotenv';
dotenv.config();

export default {
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
