import { literal } from 'sequelize';

import { UserModel } from '@/server/database';

import type { IUserAttributes } from '@/server/database';

const getById = (id: string) => UserModel.findByPk(id);

const getByEmail = (email: string) => UserModel.findOne({ where: { email } });

const edit = (id: string, attributes: Partial<IUserAttributes>) =>
  UserModel.update(attributes, {
    where: {
      id,
    },
    returning: true,
  });

const updatePasswordByEmail = (email: string, encryptedPassword: string) =>
  UserModel.update(
    {
      password: encryptedPassword,
      // Set email as verified if it was not verified before
      emailVerified: literal('CASE WHEN email_verified IS NULL THEN NOW() ELSE email_verified END'),
    },
    {
      where: {
        email,
      },
      returning: true,
    },
  );

const userRepository = {
  getById,
  getByEmail,
  edit,
  updatePasswordByEmail,
};

export default userRepository;
