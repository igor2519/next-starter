import { useSession } from 'next-auth/react';

import { PageAuthSettingsContextProvider } from '@/client/context';

import useAuthGate from './useAuthGates';

import type { IAuthInitialProps } from '@/client/types';
import type { PropsWithChildren } from 'react';

const AuthGate = ({
  children,
  auth: authSettings,
}: PropsWithChildren<{ auth?: IAuthInitialProps }>) => {
  const session = useSession();
  const { ensureAuthSettings, isAvailable } = useAuthGate(session, authSettings);

  if (!isAvailable) {
    return null;
  }

  return (
    <PageAuthSettingsContextProvider value={ensureAuthSettings}>
      {children}
    </PageAuthSettingsContextProvider>
  );
};

export default AuthGate;
