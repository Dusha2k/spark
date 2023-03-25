import { axiosInstance } from '@/shared/api';
import { ButtonLink } from '@/shared/components';
import { Flex, Link, Button, Text, Container } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
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
        <ButtonLink href="/login">Войти</ButtonLink>
        <ButtonLink href="/register">Зарегистрироваться</ButtonLink>
      </Flex>
    </Container>
  );
}
