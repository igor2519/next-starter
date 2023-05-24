import { Sequelize } from 'sequelize';

import { envUtil } from '@/shared/utils';

import type { ISequelize } from '@/server/types';

const env = envUtil.getEnv();

const sequelize = new Sequelize(env.database);

export default sequelize as ISequelize;
