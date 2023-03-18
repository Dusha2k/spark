import { LoginForm } from '@/features/login-form';
import { Box, Button, Icon, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const LoginPage = () => {
  const router = useRouter();
  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box boxShadow="2xl" p="10" rounded="md" width="100%">
        <Button onClick={() => router.push('/')} variant="link" leftIcon={<Icon as={AiOutlineArrowLeft} />}>
          Вернуться
        </Button>
        <LoginForm />
      </Box>
    </Flex>
  );
};
