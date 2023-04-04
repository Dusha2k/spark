import { RegisterForm } from '@/modules/auth';
import { Flex } from '@mantine/core';

export const Register = () => {
  return (
    <Flex justify="center" align="center" direction="column" gap={2} h="100%">
      <RegisterForm />
    </Flex>
  );
};
