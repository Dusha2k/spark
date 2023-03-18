import { RegisterForm } from '@/features/register-form';
import { Flex, Button, Icon, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const RegisterPage = () => {
  const router = useRouter();
  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box boxShadow="2xl" p="10" rounded="md" width="100%">
        <Button
          onClick={() => router.push('/')}
          variant="link"
          leftIcon={<Icon as={AiOutlineArrowLeft} />}
        >
          Вернуться
        </Button>
        <RegisterForm />
      </Box>
    </Flex>
  );
};
