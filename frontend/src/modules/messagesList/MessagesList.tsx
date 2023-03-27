import { messageAPI } from '@/shared/api';
import { Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

export const MessagesList = ({ channelId }: { channelId: number }) => {
  const { data, isLoading } = useQuery(['messages', channelId], () =>
    messageAPI.messageControllerFindByChannelId(channelId.toString()),
  );

  return (
    <Flex direction="column">
      {!isLoading && data?.data && data?.data?.length > 0 ? (
        data?.data?.map((message) => (
          <Flex direction="column" key={message.id}>
            <Text>{message.owner.login}</Text>
            <Text>{message.text}</Text>
          </Flex>
        ))
      ) : (
        <Text>Нихера нет</Text>
      )}
    </Flex>
  );
};
