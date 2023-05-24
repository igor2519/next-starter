import { DataTypes } from 'sequelize';

import { UserRole, UserStatus } from '@/shared/constants';

import sequelize from '../connection';

import type { IUser, IUserAttributes } from '@/server/database';

const UserModel = sequelize.define<IUser, IUserAttributes, {}>(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: 'email' },
    emailVerified: { type: DataTypes.DATE, field: 'email_verified' },
    image: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(UserStatus).map((val) => val.toString()),
      defaultValue: UserStatus.Active,
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(UserRole).map((val) => val.toString()),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  },
  {
    tableName: 'users',
    timestamps: true,
  },
);

export default UserModel;
