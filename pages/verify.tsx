import Verify from '@/client/page-content/Verify';
import { Layout } from '@/client/types';
import { withPageSettings } from '@/client/utils';
import { AuthAccessLevel } from '@/shared/constants';

export default function VerifyPage() {
  return <Verify />;
}

export const getServerSideProps = withPageSettings({
  auth: { accessLevel: AuthAccessLevel.Unauthorized },
  metaData: { title: 'Verify' },
  layout: Layout.Auth,
});
