import { Channels } from '@/modules/channels';
import { UsersList } from '@/modules/usersList';
import { Flex, Text } from '@chakra-ui/react';

export const Main = () => {
  return (
    <Flex>
      <Channels />
      <Flex direction="column" alignItems="center">
        <Text cursor="pointer" fontSize="3xl">
          @ME
        </Text>
        <UsersList />
      </Flex>
    </Flex>
  );
};
