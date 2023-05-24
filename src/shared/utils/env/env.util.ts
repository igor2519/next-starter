import { EnvMode } from './env.type';

import type { IEnv } from './env.type';

const processEnvMode = process.env.NODE_ENV?.toLowerCase() as EnvMode;
const envMode = Object.values(EnvMode).includes(processEnvMode) ? processEnvMode : EnvMode.DEV_ENV;

const isEnv = (mode: EnvMode) => envMode.toLowerCase() === mode;

export const getEnvMode = () => envMode;

export const isDevEnv = () => isEnv(EnvMode.DEV_ENV);

export const isProdEnv = () => isEnv(EnvMode.PROD_ENV);

export const isTestEnv = () => isEnv(EnvMode.TEST_ENV);

const mapEnvValues = {
  bool: (envValue: string) => envValue?.toLowerCase() === 'true',
  number: (envValue: string, defaultValue: number) => {
    const value = Number(envValue);

    return Number.isNaN(value) ? defaultValue : value;
  },
  array: (envValue: string, delimiter = ',') => {
    const values = envValue.split(delimiter).filter(Boolean);

    return values;
  },
  oneOf: <T extends string>(envValue: string, options: T[]) => {
    if (!options.includes(envValue as T)) {
      return options[0];
    }

    return envValue as T;
  },
};

const defaultDbPort = 5432;
const defaultVerificationEmailLifetime = 24 * 60 * 60 * 1000; // 24 hours converted to milliseconds

const mapEnv = () => {
  const parsed: IEnv = {
    appName: process.env.NEXT_PUBLIC_APP_NAME || '',
    hostUrl: process.env.NEXTAUTH_URL || '',
    database: {
      host: process.env.DATABASE_HOST || '',
      port: mapEnvValues.number(process.env.DATABASE_PORT || '', defaultDbPort),
      username: process.env.DATABASE_USERNAME || '',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || '',
      dialect: mapEnvValues.oneOf(process.env.DATABASE_DIALECT || '', [
        'mysql',
        'postgres',
        'sqlite',
        'mariadb',
        'mssql',
        'db2',
        'snowflake',
      ]),
      enableLogging: mapEnvValues.bool(process.env.DATABASE_ENABLE_LOGGING || ''),
    },
    auth: {
      nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
      googleId: process.env.GOOGLE_ID || '',
      googleSecret: process.env.GOOGLE_SECRET || '',
      verificationEmailLifetime: mapEnvValues.number(
        process.env.VERIFICATION_EMAIL_LIFETIME || '',
        defaultVerificationEmailLifetime,
      ),
    },
    mailhog: {
      host: process.env.MAILHOG_HOST || '',
      port: mapEnvValues.number(process.env.MAILHOG_PORT || '', 0),
    },
  };

  return Object.freeze(parsed);
};

let env: IEnv;
export const getEnv = (): Readonly<IEnv> => {
  if (!env) {
    env = mapEnv();
  }
  return env;
};
