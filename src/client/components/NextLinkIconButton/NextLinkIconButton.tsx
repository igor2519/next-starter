import { IconButton } from '@mui/material';
import Link from 'next/link';
import { forwardRef } from 'react';

import type { INextLinkIconButtonProps } from './types';
import type { IconButtonProps } from '@mui/material/IconButton';

const NextLinkIconButton = forwardRef(function NextButtonLink(
  { href, linkProps, children, ...props }: INextLinkIconButtonProps,
  ref: IconButtonProps['ref'],
) {
  return (
    <Link passHref {...linkProps} href={href}>
      <IconButton {...props} ref={ref}>
        {children}
      </IconButton>
    </Link>
  );
});

export default NextLinkIconButton;
