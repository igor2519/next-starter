import { envUtil } from '@/shared/utils';

const env = envUtil.getEnv();

export const verifyEmailUrl = (token: string, email: string) =>
  `${env.hostUrl}/verify?token=${token}&email=${encodeURIComponent(email)}`;

const emailUtil = {
  verifyEmailUrl,
};

export default emailUtil;
