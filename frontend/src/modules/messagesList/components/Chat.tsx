import { MessageEntity } from '@/shared/api/openAPI';
import { Text, Flex } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

interface Props {
  messages: MessageEntity[];
}

export const Chat = ({ messages }: Props) => {
  const followOutput = useCallback((isAtBottom: boolean) => {
    return isAtBottom ? 'smooth' : false;
  }, []);

  return (
    <Flex
      height="100%"
      width="100%"
      direction="column"
      flex="1"
      paddingTop="30px"
    >
      <Virtuoso
        style={{ flex: 1 }}
        initialTopMostItemIndex={messages.length - 1}
        itemContent={(index, message) => (
          <Flex direction="column" key={message.id}>
            <Text>{message.owner.login}</Text>
            <Text>{message.text}</Text>
          </Flex>
        )}
        followOutput={followOutput}
        data={messages}
      />
    </Flex>
  );
};
