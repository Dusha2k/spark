import { Button, Flex, Text } from '@mantine/core';

import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center" direction="column" gap={2} h="100%">
      <Text fz="4xl">Здарова</Text>
      <Flex gap={2}>
        <Button onClick={() => navigate('/login')}>Войти</Button>
        <Button onClick={() => navigate('/register')}>
          Зарегистрироваться
        </Button>
      </Flex>
    </Flex>
  );
};
