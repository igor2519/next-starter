import dynamic from 'next/dynamic';

import { Layout as LayoutTypes } from '@/client/types';

import type { ILayoutProps } from './types';

const AuthLayout = dynamic(() => import('@/client/components/layout/AuthLayout'));
const EmptyLayout = dynamic(() => import('@/client/components/layout/EmptyLayout'));
const MainLayout = dynamic(() => import('@/client/components/layout/MainLayout'));

const layoutMap = {
  [LayoutTypes.Main]: MainLayout,
  [LayoutTypes.Auth]: AuthLayout,
  [LayoutTypes.Empty]: EmptyLayout,
};

const Layout = ({ children, layoutType = LayoutTypes.Main }: ILayoutProps) => {
  const LayoutComponent = layoutMap[layoutType];
  return <LayoutComponent>{children}</LayoutComponent>;
};

export default Layout;
