import { Flex, Loader } from '@mantine/core';

export const FullScreenLoader = () => {
  return (
    <Flex
      justify="center"
      align="center"
      sx={{ height: '100vh', width: '100vw' }}
    >
      <Loader color="cyan" size="xl" variant="bars" />
    </Flex>
  );
};
