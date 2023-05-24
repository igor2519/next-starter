import { Button } from '@mui/material';
import Link from 'next/link';
import { forwardRef } from 'react';

import type { INextLinkButtonProps } from './types';
import type { ButtonProps } from '@mui/material/Button';

const NextLinkButton = forwardRef(function NextButtonLink(
  { href, linkProps, children, ...props }: INextLinkButtonProps,
  ref: ButtonProps['ref'],
) {
  return (
    <Link passHref {...linkProps} href={href}>
      <Button {...props} ref={ref}>
        {children}
      </Button>
    </Link>
  );
});

export default NextLinkButton;
