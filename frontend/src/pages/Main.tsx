import { Channels } from '@/modules/channels';
import { UsersList } from '@/modules/usersList';
import { Flex, Text } from '@mantine/core';

export const Main = () => {
  return (
    <Flex>
      <Channels />
      <Flex direction="column" align="center">
        <Text sx={{ curesor: 'pointer' }} fz="xl">
          @ME
        </Text>
        <UsersList />
      </Flex>
    </Flex>
  );
};
