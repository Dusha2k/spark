import { LoginForm } from '@/modules/auth';
import { Container } from '@chakra-ui/react';

export const Login = () => {
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      height="100%"
    >
      <LoginForm />
    </Container>
  );
};
