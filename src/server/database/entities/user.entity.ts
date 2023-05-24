import type { UserRole, UserStatus } from '@/shared/constants';
import type { Model, Optional } from 'sequelize';

export interface IPublicUserAttributes {
  id: string;
  name: string | null;
  status: UserStatus;
  email: string;
  role: UserRole;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// User attributes need to extends Record to be compatible with `AdapterUser` interface from `next-auth`
export interface IUserAttributes extends IPublicUserAttributes, Record<string, unknown> {
  password: string;
}

export type IUserCreationAttributes = Optional<
  IUserAttributes,
  'id' | 'status' | 'emailVerified' | 'image' | 'password' | 'createdAt' | 'updatedAt'
>;

export type IUser = Model<IUserAttributes, IUserCreationAttributes> & IUserAttributes;
