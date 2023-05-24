import { useRouter } from 'next/router';

import { isRouteAvailable } from '@/client/utils';
import { isSSR } from '@/shared/utils';

import type { IAuthInitialProps } from '@/client/types';
import type { SessionContextValue } from 'next-auth/react';

const useAuthGate = <R extends boolean = false>(
  session: SessionContextValue<R>,
  authSettings?: IAuthInitialProps,
) => {
  const router = useRouter();

  const { isAvailable, redirectUrl, ensureAuthSettings } = isRouteAvailable(session, authSettings);

  // Redirect only when auth is loaded
  // Blank screen will be displayed before this
  // Redirect should not happen on server side since `useRouter` won't work there
  // Server side redirects are handled inside `with-page-settings` util
  if (redirectUrl !== null && !isSSR()) {
    // Perform redirect on a same render cycle to prevent UI flickering
    router.replace(redirectUrl);
  }

  return { ensureAuthSettings, isAvailable };
};

export default useAuthGate;
