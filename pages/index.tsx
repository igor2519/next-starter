import { withPageSettings } from '@/client/utils';
import { AuthAccessLevel } from '@/shared/constants';

const Home = () => {
  return (
    <>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </>
  );
};

export const getStaticProps = withPageSettings({
  auth: { accessLevel: AuthAccessLevel.Public },
  metaData: {
    meta: [
      {
        name: 'description',
        content: 'Generated by create next app',
      },
    ],
  },
});

export default Home;
