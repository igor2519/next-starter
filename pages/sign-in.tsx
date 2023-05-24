import SignIn from '@/client/page-content/SignIn';
import { Layout } from '@/client/types';
import { withPageSettings } from '@/client/utils';
import { AuthAccessLevel } from '@/shared/constants';

export default function SignInPage() {
  return <SignIn />;
}

export const getServerSideProps = withPageSettings({
  auth: { accessLevel: AuthAccessLevel.Unauthorized },
  metaData: { title: 'Sign in' },
  layout: Layout.Auth,
});
