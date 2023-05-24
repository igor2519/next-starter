import { getSession } from 'next-auth/react';

import { isRouteAvailable } from '@/client/utils';
import { AuthAccessLevel } from '@/shared/constants';

import type { IPageSettings } from '@/client/types';
import type { GetServerSidePropsContext, GetServerSideProps, Redirect } from 'next';
import type { ParsedUrlQuery } from 'querystring';

const withPageSettings =
  <
    P extends { [key: string]: unknown } = { [key: string]: unknown },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
  >(
    { auth, metaData, layout }: IPageSettings,
    getProps?: GetServerSideProps<P, Q>,
  ) =>
  async (context: GetServerSidePropsContext<Q>) => {
    const internalProps: IPageSettings = { auth };
    // Add property only if it exists
    // since `undefined` value will case SerializableError
    if (metaData) {
      internalProps.metaData = metaData;
    }
    if (layout) {
      internalProps.layout = layout;
    }
    if (layout) {
      internalProps.layout = layout;
    }
    if (auth.accessLevel !== AuthAccessLevel.Public) {
      // Add session on the server side for all protected routes automatically
      const session = await getSession({ req: context.req });
      const { redirectUrl } = isRouteAvailable(
        session
          ? { status: 'authenticated', data: session }
          : { status: 'unauthenticated', data: null },
        auth,
      );

      if (redirectUrl) {
        return {
          redirect: {
            destination: redirectUrl,
            permanent: false,
          },
        };
      }

      internalProps.session = session;
    }

    if (!getProps) {
      return {
        props: {
          internal: internalProps,
        },
      };
    }

    // Compute `getProps` method passed from page
    const result: { props?: P | Promise<P>; redirect?: Redirect; notFound?: true } = await getProps(
      context,
    );

    if (!result.props) {
      return result;
    }

    // Ensure props promise is resolved
    result.props = await result.props;

    // Allow result of `getProps` override internal props passed from `IPageSettings`
    const internalPropsOverride = result.props.internal as IPageSettings | undefined;
    return {
      props: {
        ...result.props,
        internal: {
          ...internalProps,
          ...(internalPropsOverride ?? {}),
        },
      },
    };
  };

export default withPageSettings;
