import knex from "knex";
import config from "./config";

const connection: any = {
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  ssl: { rejectUnauthorized: false },
};

const knexClient = knex({
  client: "pg",
  connection,
});

export default knexClient;
