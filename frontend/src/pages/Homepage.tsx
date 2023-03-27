import { Container, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Homepage = () => {
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
        <Link to="/login">Войти</Link>
        <Link to="/register">Зарегистрироваться</Link>
      </Flex>
    </Container>
  );
};
