import { AuthAccessLevel } from '@/shared/constants';

import getAuthRedirect from './get-auth-redirect';

import type { IAuthInitialProps } from '@/client/types';
import type { UserRole } from '@/shared/constants';
import type { SessionContextValue } from 'next-auth/react';

const checkUserPermissions = (role: UserRole, permissions?: UserRole[]) => {
  // Provided permission list includes user role.
  return permissions?.length ? permissions.includes(role) : true;
};

// Feel free to place additional authorization checks here
const isUserAuthenticatedForRoute = <R extends boolean = false>(
  session: SessionContextValue<R>,
  authSettings: IAuthInitialProps,
) =>
  // This route is private
  authSettings.accessLevel === AuthAccessLevel.Authorized &&
  // The user is signed in
  session.status === 'authenticated' &&
  // The user has a corresponding role
  checkUserPermissions(session.data.user.role, authSettings.permissions);

const isRouteAvailable = <R extends boolean = false>(
  session: SessionContextValue<R>,
  authSettings?: IAuthInitialProps,
) => {
  const ensureAuthSettings = {
    accessLevel: authSettings?.accessLevel || AuthAccessLevel.Public,
    permissions: authSettings?.permissions,
  };
  // This is a route available for any user
  const isPublicRoute = ensureAuthSettings.accessLevel === AuthAccessLevel.Public;

  if (isPublicRoute) {
    // Allow prerender public page regardless of auth status
    return {
      isAvailable: true,
      redirectUrl: null,
      ensureAuthSettings,
    };
  }

  // Await for authentication for non public routes
  if (session.status === 'loading') {
    return {
      isAvailable: false,
      redirectUrl: null,
      ensureAuthSettings,
    };
  }

  // This route is available for unauthorized users only
  // and current user is unauthorized
  const isUnauthorizedRoute =
    session.status === 'unauthenticated' &&
    ensureAuthSettings.accessLevel === AuthAccessLevel.Unauthorized;

  const isPageAvailable =
    isUnauthorizedRoute || isUserAuthenticatedForRoute(session, ensureAuthSettings);

  return {
    isAvailable: isPageAvailable,
    redirectUrl: isPageAvailable ? null : getAuthRedirect(session),
    ensureAuthSettings,
  };
};

export default isRouteAvailable;
