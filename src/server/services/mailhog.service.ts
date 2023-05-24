import nodemailer from 'nodemailer';

import { envUtil } from '@/shared/utils';

import { EmailTemplate } from '../constants';

import type {
  AnyEmailParams,
  EmailParams,
  IResetPasswordEmailParams,
  ISignedUpEmailParams,
} from '../types';
import type { Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

let globalTransporter: Transporter<SMTPTransport.SentMessageInfo>;

const env = envUtil.getEnv();

const createTransporter = async () => {
  if (globalTransporter) {
    return globalTransporter;
  }

  globalTransporter = nodemailer.createTransport({
    host: env.mailhog.host,
    port: env.mailhog.port,
  });
  await new Promise((res, rej) =>
    globalTransporter.verify((err, success) => {
      if (err) {
        return rej(err);
      }
      res(success);
    }),
  );
  return globalTransporter;
};

const emailContentBuilders = {
  [EmailTemplate.signedUp]: (params: ISignedUpEmailParams) => {
    return [
      `Dear ${params.name || 'user'},`,
      ``,
      `Your account was created.`,
      `Please confirm your account email by clicking here: ${params.verifyUrl}`,
      `Best regards`,
      ``,
      env.appName,
    ].join('\n');
  },
  [EmailTemplate.forgotPassword]: (params: IResetPasswordEmailParams) => {
    return [
      `Dear ${params.name || 'user'},`,
      ``,
      `The password request was requested for your account`,
      `Please follow the link for setting up a new password:`,
      params.resetLink,
      ``,
      `Best regards`,
      ``,
      env.appName,
    ].join('\n');
  },
} as const;

const getEmailContentBuilder = (template: EmailTemplate) => {
  const defaultContentBuilder = (params: EmailParams<EmailTemplate>) =>
    JSON.stringify(params, null, 2);
  return emailContentBuilders[template] ?? defaultContentBuilder;
};

export const sendEmail = async <EmailType extends EmailTemplate>(
  recipient: string,
  template: EmailType,
  params: EmailParams<EmailType>,
) => {
  const transporter = await createTransporter();

  const buildContent = getEmailContentBuilder(template);

  const messageStatus = await transporter.sendMail({
    from: `${env.appName} <no-reply@example.org>`,
    to: recipient,
    subject: `Template ${template} - ${env.appName}`,
    text: buildContent(params as AnyEmailParams),
  });

  return messageStatus;
};

const mailhogService = {
  sendEmail,
};

export default mailhogService;
