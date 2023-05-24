import type { EmailTemplate } from '../constants';

export interface ISignedUpEmailParams {
  name: string | null;
  verifyUrl: string;
}
export interface IResetPasswordEmailParams {
  name: string | null;
  resetLink: string;
}

export type AnyEmailParams = ISignedUpEmailParams & IResetPasswordEmailParams;

export type EmailParams<EmailType extends EmailTemplate> = EmailType extends EmailTemplate.signedUp
  ? ISignedUpEmailParams
  : EmailType extends EmailTemplate.forgotPassword
  ? IResetPasswordEmailParams
  : never;

export type ISendEmail<EmailType extends EmailTemplate> = (
  recipient: string,
  template: EmailType,
  params: EmailParams<EmailType>,
) => Promise<void>;
