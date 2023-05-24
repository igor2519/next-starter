import { createContext, useContext } from 'react';

import { AuthAccessLevel } from '@/shared/constants';

import type { IAuthInitialProps } from '@/client/types';

const defaultAuthSettings: IAuthInitialProps = {
  accessLevel: AuthAccessLevel.Public,
};

export const PageAuthSettingsContext = createContext<IAuthInitialProps>(defaultAuthSettings);

export const usePageAuthSettings = () => {
  return useContext(PageAuthSettingsContext);
};

export const PageAuthSettingsContextProvider = PageAuthSettingsContext.Provider;
