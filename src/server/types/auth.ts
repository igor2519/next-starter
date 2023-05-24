import type { IUserAttributes } from '@/server/database';
import type { Session } from 'next-auth';
import type { CredentialInput, CredentialsConfig } from 'next-auth/providers';

export type UserCredentialsConfig<C extends Record<string, CredentialInput>> = Partial<
  Omit<CredentialsConfig<C>, 'options'>
> &
  Pick<CredentialsConfig<C>, 'authorize' | 'credentials'>;

export interface SessionCallbackParams {
  user: IUserAttributes;
  session: Session;
}
