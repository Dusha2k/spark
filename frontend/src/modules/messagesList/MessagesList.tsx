import { messageAPI, socket } from '@/shared/api';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const MessagesList = ({ channelId }: { channelId: number }) => {
  const [value, setValue] = useState('');
  const { data, isLoading } = useQuery(['messages', channelId], () =>
    messageAPI.messageControllerFindByChannelId(channelId.toString()),
  );

  useEffect(() => {
    socket.on('receive_message', (data) => console.log(data));
    return () => {
      socket.off('receive_message');
    };
  }, []);

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
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        onClick={() => socket.emit('send_message', { channelId, text: value })}
      >
        Отправить сообщение
      </Button>
    </Flex>
  );
};
