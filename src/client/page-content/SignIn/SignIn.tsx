import { Grid, Paper, Container } from '@mui/material';

import { EmailSignInForm } from '@/client/components/auth';

import styles from './styles';

export default function SignIn() {
  return (
    <Container fixed maxWidth="md">
      <Paper sx={styles.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <EmailSignInForm />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
