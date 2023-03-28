import { Button, Container, Flex, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      height="100%"
    >
      <Text fontSize="4xl">Здарова</Text>
      <Flex gap={2}>
        <Button onClick={() => navigate('/login')}>Войти</Button>
        <Button onClick={() => navigate('/register')}>
          Зарегистрироваться
        </Button>
      </Flex>
    </Container>
  );
};
