import { UserRole } from '@/shared/constants';

import type { SessionContextValue } from 'next-auth/react';

const getAuthRedirect = <R extends boolean = false>(session: SessionContextValue<R>) => {
  if (session.status !== 'authenticated') {
    return '/sign-in';
  }

  // Handle additional redirects here
  if (session.data.user?.role === UserRole.Admin) {
    return '/admin';
  }

  return '/';
};

export default getAuthRedirect;
