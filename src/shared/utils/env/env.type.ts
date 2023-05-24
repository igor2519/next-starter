import type { Dialect } from 'sequelize/types';

export enum EnvMode {
  DEV_ENV = 'development',
  PROD_ENV = 'production',
  TEST_ENV = 'test',
}

interface IDatabaseConfigs {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: Dialect;
  enableLogging: boolean;
}

interface IAuthConfigs {
  nextAuthSecret: string;
  googleId: string;
  googleSecret: string;
  verificationEmailLifetime: number;
}

interface IMailhogConfigs {
  host: string;
  port: number;
}

export interface IEnv {
  appName: string;
  hostUrl: string;
  database: IDatabaseConfigs;
  auth: IAuthConfigs;
  mailhog: IMailhogConfigs;
}
