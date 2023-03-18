import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';

export const Homepage = () => {
  const router = useRouter();
  return (
    <Flex
      flexDirection="column"
      gap={2}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="3xl">Здарова</Text>
      <Flex gap={1}>
        <Button onClick={() => router.push('/login')}>Войти</Button>
        <Button onClick={() => router.push('/register')}>Зарегистрироваться</Button>
      </Flex>
    </Flex>
  );
};
