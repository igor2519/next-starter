import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

import type { IEmailSignInFormProps } from './types';
import type { FormikHelpers } from 'formik';

const useEmailSignInForm = () => {
  const signInHandler = useCallback(
    async (
      { email, password }: IEmailSignInFormProps,
      { setErrors }: FormikHelpers<IEmailSignInFormProps>,
    ) => {
      const res = await signIn<'credentials'>('credentials', { email, password, redirect: false });
      if (res?.error) {
        setErrors({
          email: ' ',
          password: res.error,
        });
      }
    },
    [],
  );

  return signInHandler;
};

export default useEmailSignInForm;
