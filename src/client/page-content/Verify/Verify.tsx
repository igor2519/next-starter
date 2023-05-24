import { Container } from '@mui/material';

import { VerificationHandler } from '@/client/components/auth';

export default function Verify() {
  return (
    <Container fixed maxWidth="md">
      <VerificationHandler />
    </Container>
  );
}
