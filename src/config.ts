require("dotenv").config();

const {
  NODE_ENV,
  SERVER_PORT,
  SALT_ROUND,

  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,

  CLIENT_ID,
  CLIENT_SECRET,
  DOMAIN,
  DUMMY_PASSWORD,
} = process.env;

export default {
  NODE_ENV,
  SERVER_PORT: Number(SERVER_PORT),
  SALT_ROUND: Number(SALT_ROUND),

  DB_HOST,
  DB_PORT: Number(DB_PORT),
  DB_USER,
  DB_PASS,
  DB_NAME,

  CLIENT_ID,
  CLIENT_SECRET,
  DOMAIN,
  DUMMY_PASSWORD,
};
