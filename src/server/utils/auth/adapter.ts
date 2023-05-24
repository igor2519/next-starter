import SequelizeAdapter from '@next-auth/sequelize-adapter';

import { sequelize, UserModel } from '@/server/database';

export const adapter = SequelizeAdapter(sequelize, {
  synchronize: false,
  models: {
    User: UserModel,
  },
});
