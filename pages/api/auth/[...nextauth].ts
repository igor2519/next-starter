import NextAuth from 'next-auth';

import { nextAuthOptions } from '@/server/utils/auth';

// Next auth handles sessions and sign in flow
// check `nextAuthOptions` to get more information
export default NextAuth(nextAuthOptions);
