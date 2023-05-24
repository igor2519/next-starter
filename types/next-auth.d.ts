import 'next-auth';
import type { IUserAttributes } from '../src/server/database';
import type { IFullUserResponse } from '../src/shared/data-transfer/responses';
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IFullUserResponse;
  }

  /**
   * The shape of the returned object in the OAuth providers' `profile` callback,
   * available in the `jwt` and `session` callbacks,
   * or the second parameter of the `session` callback, when using a database.
   *
   * [`signIn` callback](https://next-auth.js.org/configuration/callbacks#sign-in-callback) |
   * [`session` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) |
   * [`jwt` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) |
   * [`profile` OAuth provider callback](https://next-auth.js.org/configuration/providers#using-a-custom-provider)
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface User extends IUserAttributes {}
}
