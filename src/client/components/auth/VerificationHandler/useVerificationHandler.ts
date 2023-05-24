import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useVerificationHandler = () => {
  const router = useRouter();
  const [hasError, setError] = useState(false);
  useEffect(() => {
    const { token, email } = router.query;
    if (!token || !email) {
      setError(true);
      return;
    }

    signIn<'credentials'>('verification-token', { email, token, redirect: false }).then((res) => {
      if (res?.error) {
        setError(true);
        return;
      }
      router.replace('/');
    });
  }, [router, router.query]);

  return hasError;
};

export default useVerificationHandler;
