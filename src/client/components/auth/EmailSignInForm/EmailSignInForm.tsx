import { Button, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';

import { PasswordInput, TextInput } from '@/client/components/inputs';

import { schema } from './schema';
import useEmailSignInForm from './useEmailSignInForm';

export default function EmailSignInForm() {
  const onSubmit = useEmailSignInForm();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Field
                type="email"
                name="email"
                autoComplete="email"
                fullWidth
                component={TextInput}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="password"
                autoComplete="current-password"
                fullWidth
                component={PasswordInput}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
