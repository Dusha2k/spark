import { LoginForm } from '@/modules/auth';
import { Flex } from '@mantine/core';

export const Login = () => {
  return (
    <Flex justify="center" align="center" direction="column" gap={2} h="100%">
      <LoginForm />
    </Flex>
  );
};
