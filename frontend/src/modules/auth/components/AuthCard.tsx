// import { Flex, Button, Icon, Box, Text } from '@chakra-ui/react';
import { Flex, Button, Box, Text } from '@mantine/core';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
  title: string;
}

export const AuthCard = ({ children, title }: Props) => {
  const navigate = useNavigate();
  return (
    <Flex w="100%" h="100%" justify="center" align="center">
      <Box p="0.6rem" w="100%">
        <Button
          onClick={() => navigate('/')}
          variant="subtitle"
          leftIcon={<AiOutlineArrowLeft />}
          // leftIcon={<Icon as={AiOutlineArrowLeft} />}
        >
          Вернуться
        </Button>
        <Flex h="100%" direction="column">
          <Text mb={2} fz="2xl" align="center">
            {title}
          </Text>
          {children}
        </Flex>
      </Box>
    </Flex>
  );
};
