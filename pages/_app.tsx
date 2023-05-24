import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { AuthGate, HtmlHead, Layout } from '@/client/components';
import { theme, createEmotionCache } from '@/client/constants';
import { initializeStore } from '@/client/redux/store';

import type { MyAppProps } from '@/client/types';

function MyApp({ Component, pageProps, emotionCache }: MyAppProps) {
  const styleCache = useMemo(() => emotionCache || createEmotionCache(), [emotionCache]);
  const store = useMemo(() => {
    return initializeStore(pageProps.internal?.initialReduxState);
  }, [pageProps.internal?.initialReduxState]);

  return (
    <Provider store={store}>
      <CacheProvider value={styleCache}>
        <ThemeProvider theme={theme}>
          <HtmlHead {...pageProps.internal?.metaData} />
          <CssBaseline />
          <SessionProvider
            session={pageProps.internal?.session}
            refetchInterval={120}
            refetchOnWindowFocus
          >
            <AuthGate auth={pageProps.internal?.auth}>
              <Layout layoutType={pageProps.internal?.layout}>
                <Component {...pageProps} />
              </Layout>
            </AuthGate>
            <ToastContainer />
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
export default MyApp;
