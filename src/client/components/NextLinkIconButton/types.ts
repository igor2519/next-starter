import type { IconButtonProps } from '@mui/material/IconButton';
import type { LinkProps } from 'next/link';

export interface INextLinkIconButtonProps extends Omit<IconButtonProps, 'href'> {
  href: LinkProps['href'];
  linkProps?: Omit<LinkProps, 'passHref' | 'href' | 'children'>;
}
