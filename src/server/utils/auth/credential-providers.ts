import { authorizationService } from '@/server/services';

import type { UserCredentialsConfig } from '@/server/types';
import type { CredentialInput } from 'next-auth/providers';

export const credentialsProviderOptions: UserCredentialsConfig<
  Record<'email' | 'password', CredentialInput>
> = {
  name: 'Sign in with email and password',
  // The credentials is used to generate a suitable form on the sign in page.
  // You can specify whatever fields you are expecting to be submitted.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize(credentials) {
    // You need to provide your own logic here that takes the credentials
    // submitted and returns either a object representing a user or value
    // that is false/null if the credentials are invalid.
    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    // You can also use the `req` object to obtain additional parameters
    // (i.e., the request IP address)
    if (!credentials?.email || !credentials?.password) {
      return null;
    }

    return authorizationService.login(credentials.email, credentials.password);
  },
};

export const verificationTokenProviderOptions: UserCredentialsConfig<
  Record<'email' | 'token', CredentialInput>
> = {
  id: 'verification-token',
  name: 'Verification',
  credentials: {
    email: { label: 'Email', type: 'email', placeholder: 'john@example.com' },
    token: { label: 'Verification token', type: 'text ' },
  },
  async authorize(credentials) {
    const { email, token } = credentials ?? {};
    if (!email || !token) {
      return null;
    }
    return authorizationService.authorizeWithVerificationToken(email, token);
  },
};
