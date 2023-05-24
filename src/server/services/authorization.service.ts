import { randomBytes } from 'crypto';

import bcrypt from 'bcrypt';

import { errorMessages, validationMessages } from '@/server/constants';
import { userDtoCreators } from '@/server/dto-creators';
import { ClientError } from '@/server/models';
import { userRepository } from '@/server/repositories';
import { emailService } from '@/server/services';
import { emailUtil, authUtil } from '@/server/utils';
import { UserStatus } from '@/shared/constants';
import { envUtil } from '@/shared/utils';

import type { SessionCallbackParams } from '@/server/types';
import type { IFullUserResponse } from '@/shared/data-transfer/responses';
import type { Adapter } from 'next-auth/adapters';

const env = envUtil.getEnv();

const cryptPass = async (password: string) => bcrypt.hash(password, await bcrypt.genSalt());

/**
 *
 * @param email email of the user who will own the token
 * @param lifetime token lifetime in milliseconds
 * @param adapter next-auth adapter what will be used to save token to the database
 * @returns token that can be used to sign in
 */
const createSignInToken = async (email: string, lifetime: number, adapter: Adapter) => {
  // Generate token
  const token = randomBytes(32).toString('hex');

  const expires = new Date(Date.now() + lifetime);

  if (!adapter.createVerificationToken) {
    throw new Error(errorMessages.dbAdapterNotSupportVerification);
  }

  // Save in database
  await adapter.createVerificationToken({
    identifier: email,
    token: authUtil.hashToken(token, env.auth.nextAuthSecret),
    expires,
  });

  return token;
};

const getUser = async (id: string) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new ClientError(errorMessages.unauthorized);
  }

  return userDtoCreators.createFullUserDto(user);
};

const sendVerificationEmail = async (user: Pick<IFullUserResponse, 'email' | 'name'>) => {
  const verifyToken = await createSignInToken(
    user.email,
    env.auth.verificationEmailLifetime,
    authUtil.adapter,
  );
  await emailService.registerEmail(user.email, {
    name: user.name,
    verifyUrl: emailUtil.verifyEmailUrl(verifyToken, user.email),
  });
};

const login = async (email: string, password: string) => {
  if (!password || !email) {
    return null;
  }

  const user = await userRepository.getByEmail(email);

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    throw new ClientError(validationMessages.invalidLogin);
  }

  if (user.status === UserStatus.Blocked) {
    throw new ClientError(validationMessages.blockedLogin);
  }

  if (user.emailVerified === null) {
    await sendVerificationEmail(user);
    throw new ClientError(validationMessages.unverifiedLogin);
  }

  return userDtoCreators.createFullUserDto(user);
};

const authorizeWithVerificationToken = async (email: string, token: string) => {
  const user = await userRepository.getByEmail(email);
  if (!user || user.status === UserStatus.Blocked) {
    throw new ClientError(validationMessages.blockedLogin);
  }

  const verification = await authUtil.adapter.useVerificationToken?.({
    identifier: email,
    token: authUtil.hashToken(token, env.auth.nextAuthSecret),
  });
  const isVerificationValid = verification && verification.expires.valueOf() > Date.now();
  if (!isVerificationValid) {
    return null;
  }

  const [, [updatedUser]] = await userRepository.edit(user.id, { emailVerified: new Date() });
  return userDtoCreators.createFullUserDto(updatedUser);
};

const sendForgotEmail = async (email: string) => {
  const user = await userRepository.getByEmail(email);
  if (!user) {
    return;
  }
  if (user.status === UserStatus.Blocked) {
    throw new ClientError(validationMessages.blockedLogin);
  }

  const verifyToken = await createSignInToken(
    user.email,
    env.auth.verificationEmailLifetime,
    authUtil.adapter,
  );
  await emailService.forgotEmail(user.email, {
    name: user.name,
    resetLink: emailUtil.verifyEmailUrl(verifyToken, user.email),
  });
};

const refreshPassword = async (email: string, token: string, password: string) => {
  if (!authUtil.adapter.useVerificationToken) {
    throw new Error(errorMessages.dbAdapterNotSupportVerification);
  }
  const verification = await authUtil.adapter.useVerificationToken({ identifier: email, token });

  const isVerificationValid = verification && verification.expires.valueOf() > Date.now();
  if (!isVerificationValid) {
    throw new ClientError(errorMessages.linkExpired);
  }

  const [count] = await userRepository.updatePasswordByEmail(email, await cryptPass(password));
  if (!count) {
    throw new ClientError(errorMessages.userNotExists);
  }
};

// Add user object to the session object
// to be able to access it using `getSession` method
const populateUserSession = ({ session, user }: SessionCallbackParams) => {
  session.user = userDtoCreators.createFullUserDtoFromAttributes(user);
  return session;
};

const authorizationService = {
  sendForgotEmail,
  sendVerificationEmail,
  getUser,
  login,
  authorizeWithVerificationToken,
  refreshPassword,
  cryptPass,
  populateUserSession,
};
export default authorizationService;
