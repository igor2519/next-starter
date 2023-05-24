import { Grid } from '@mui/material';

import styles from './styles';

import type { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Grid container sx={styles.container} alignItems="center">
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
