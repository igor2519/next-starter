import type { PropsWithChildren } from 'react';

const EmptyLayout = ({ children }: PropsWithChildren<{}>) => {
  return <>{children}</>;
};

export default EmptyLayout;
