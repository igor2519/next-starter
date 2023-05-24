import type { Layout } from '@/client/types';
import type { ReactNode } from 'react';

export interface ILayoutProps {
  children: ReactNode;
  layoutType?: Layout;
}
