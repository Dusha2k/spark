import { Header } from '@/modules/header';
import { Flex } from '@mantine/core';

export const HeaderLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <Flex h="100%" direction="column">
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
    </Flex>
  );
};
