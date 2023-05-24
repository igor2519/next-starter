import { withPageSettings } from '@/client/utils';
import { AuthAccessLevel } from '@/shared/constants';

const Home = () => {
  return (
    <>
      <h1>Profile </h1>
    </>
  );
};

export const getServerSideProps = withPageSettings({
  auth: { accessLevel: AuthAccessLevel.Authorized },
  metaData: { title: 'Profile' },
});

export default Home;
