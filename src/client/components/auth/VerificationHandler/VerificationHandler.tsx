import { Stack, Typography } from '@mui/material';

import NextLinkButton from '../../NextLinkButton';

import styles from './styles';
import useVerificationHandler from './useVerificationHandler';

export default function VerificationHandler() {
  const hasError = useVerificationHandler();

  // It is still loading or redirect will happen in a next tick
  if (!hasError) {
    return null;
  }

  return (
    <Stack alignContent="center" gap={2}>
      <Typography variant="h3" textAlign="center">
        This link has been expired!{' '}
        <NextLinkButton href="/sign-in" sx={styles.button} disableRipple>
          Sign in
        </NextLinkButton>{' '}
        or{' '}
        <NextLinkButton href="/forgot-password" sx={styles.button} disableRipple>
          reset your password
        </NextLinkButton>{' '}
        to get a new verification email.
      </Typography>
    </Stack>
  );
}
