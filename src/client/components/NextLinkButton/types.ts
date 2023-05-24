import type { ButtonProps } from '@mui/material/Button';
import type { LinkProps } from 'next/link';

export interface INextLinkButtonProps extends Omit<ButtonProps, 'href'> {
  href: LinkProps['href'];
  linkProps?: Omit<LinkProps, 'passHref' | 'href' | 'children'>;
}
