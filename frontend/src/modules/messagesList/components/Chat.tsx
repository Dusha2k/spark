import { MessageEntity } from '@/shared/api/openAPI';
import { Text, Flex } from '@mantine/core';
import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

interface Props {
  messages: MessageEntity[];
}

export const Chat = ({ messages }: Props) => {
  const followOutput = useCallback((isAtBottom: boolean) => {
    return isAtBottom ? 'smooth' : false;
  }, []);

  return (
    <Flex h="100%" w="100%" direction="column" pt="30px" sx={{ flex: '1' }}>
      <Virtuoso
        style={{ flex: 1 }}
        initialTopMostItemIndex={messages.length - 1}
        itemContent={(_index, message) => (
          <Flex direction="column" key={message.id}>
            <Text>{message.owner.nickname}</Text>
            <Text>{message.text}</Text>
          </Flex>
        )}
        followOutput={followOutput}
        data={messages}
      />
    </Flex>
  );
};
