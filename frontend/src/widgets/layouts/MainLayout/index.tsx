import { Container } from '@chakra-ui/react';

export const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <header></header>
      <Container>{children}</Container>
      <footer></footer>
    </>
  );
};
