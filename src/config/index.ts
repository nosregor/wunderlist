import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  name: string;
  port: string | number;
  database: {
    MONGO_URI: string;
    MONGODB_DB_MAIN: string;
  };
  secret: string;
}

function getStringEnv(
  variable: string,
  defaultValue?: string,
): string {
  const val = process.env[variable];
  if (!val) {
    throw new Error(`Env variable; ${variable} not set`);
  }
  return val;
}

const NODE_ENV: string = getStringEnv('NODE_ENV', 'development');
const NAME: string = 'wonderlist';
const PORT: string | number = getStringEnv('PORT', '3000');
const SECRET = getStringEnv('SECRET', 'TOP_SECRET');
const MONGO_URI = getStringEnv(
  'MONGO_URI',
  'mongodb://localhost:27017/',
);
const MONGODB_DB_MAIN = getStringEnv(
  'MONGODB_DB_MAIN',
  'wonderlist_database',
);

const development: IConfig = {
  name: NAME,
  port: PORT,
  database: {
    MONGO_URI: MONGO_URI,
    MONGODB_DB_MAIN: MONGODB_DB_MAIN,
  },
  secret: SECRET,
};

const production: IConfig = {
  name: NAME,
  port: PORT,
  database: {
    MONGO_URI: MONGO_URI,
    MONGODB_DB_MAIN: MONGODB_DB_MAIN,
  },
  secret: SECRET,
};

const test: IConfig = {
  name: NAME,
  port: PORT,
  database: {
    MONGO_URI: MONGO_URI,
    MONGODB_DB_MAIN: MONGODB_DB_MAIN,
  },
  secret: SECRET,
};

const config: {
  [name: string]: IConfig;
} = { test, development, production };

export default config[NODE_ENV];
