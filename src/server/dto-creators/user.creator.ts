import type { IUser, IUserAttributes } from '@/server/database';
import type { IFullUserResponse } from '@/shared/data-transfer/responses';

const createFullUserDtoFromAttributes = (user: IUserAttributes): IFullUserResponse => {
  const { password, ...result } = user;
  return result;
};

const createFullUserDto = (user: IUser): IFullUserResponse => {
  return createFullUserDtoFromAttributes(user.get({ plain: true }));
};

const userDtoCreators = {
  createFullUserDtoFromAttributes,
  createFullUserDto,
};

export default userDtoCreators;
