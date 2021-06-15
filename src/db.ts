import knex from 'knex';
import config from "./config"

const knexClient = knex({
    client: 'pg',
    connection: {
      host : config.DB_HOST,
      port: config.DB_PORT,
      user : config.DB_USER,
      password : config.DB_PASS,
      database : config.DB_NAME,
      ssl: { rejectUnauthorized: false }
    }
  });

export default knexClient