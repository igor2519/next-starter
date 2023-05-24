import { envUtil } from '@/shared/utils';

import { EmailTemplate } from '../constants';

import { sendEmail as sendMailhogEmail } from './mailhog.service';

import type { ISignedUpEmailParams, IResetPasswordEmailParams } from '@/server/types';

export const buildEmailSender = () => {
  const env = envUtil.getEnv();
  const hasMailhogConfigs = Boolean(env.mailhog.host && env.mailhog.port);
  if (hasMailhogConfigs) {
    return sendMailhogEmail;
  }
  // TODO: implement ISendEmail interface and return it here to use as production email service
  return sendMailhogEmail;
};

const sendEmail = buildEmailSender();

const registerEmail = (recipient: string, data: ISignedUpEmailParams) => {
  sendEmail(recipient, EmailTemplate.signedUp, data);
};

const forgotEmail = (recipient: string, data: IResetPasswordEmailParams) => {
  sendEmail(recipient, EmailTemplate.forgotPassword, data);
};

const emailService = {
  registerEmail,
  forgotEmail,
  sendEmail,
};

export default emailService;
