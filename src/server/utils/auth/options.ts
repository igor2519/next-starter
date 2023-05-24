import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { authorizationService } from '@/server/services';
import { envUtil } from '@/shared/utils';

import { adapter } from './adapter';
import {
  credentialsProviderOptions,
  verificationTokenProviderOptions,
} from './credential-providers';
import { getCookies } from './get-cookies';

import type { NextAuthOptions } from 'next-auth';

const env = envUtil.getEnv();

export const useSecureCookies = env.hostUrl.startsWith('https://');

export const defaultCookies = getCookies(useSecureCookies);

// https://next-auth.js.org/configuration/options
export const nextAuthOptions = {
  adapter,
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: env.auth.googleId,
      clientSecret: env.auth.googleSecret,
    }),
    // This provider is used to sign in user with username and password
    CredentialsProvider(credentialsProviderOptions),
    // This one is used when you need to authorize user from a server side by returning token to the frontend.
    // That token is used to perform passwordless authentication
    CredentialsProvider(verificationTokenProviderOptions),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    session: authorizationService.populateUserSession,
  },
  useSecureCookies,
  cookies: defaultCookies,
} as NextAuthOptions;
