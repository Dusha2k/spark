import { RegisterForm } from '@/modules/auth';
import { Container } from '@chakra-ui/react';

export const Register = () => {
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      height="100%"
    >
      <RegisterForm />
    </Container>
  );
};
