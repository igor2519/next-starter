import type { IHtmlHeadProps } from '@/client/components/HtmlHead';
import type { RootState } from '@/client/redux/store';
import type { Layout } from '@/client/types';
import type { AuthAccessLevel, UserRole } from '@/shared/constants';
import type { EmotionCache } from '@emotion/react';
import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';

export interface AppAdditionalProps {
  emotionCache?: EmotionCache;
}

export interface IAuthInitialProps {
  accessLevel: AuthAccessLevel;
  permissions?: UserRole[];
}

export interface IPageSettings {
  auth: IAuthInitialProps;
  session?: Session | null;
  metaData?: IHtmlHeadProps;
  layout?: Layout;
  initialReduxState?: RootState;
}

export type MyAppProps = AppProps & AppAdditionalProps;
