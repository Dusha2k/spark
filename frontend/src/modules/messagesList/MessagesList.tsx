import { socket } from '@/shared/api';
import { useAppSelector } from '@/shared/hooks';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MessagesList = ({ channelId }: { channelId: number }) => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const userId = useAppSelector((state) => state.user.id);
  const channel = useAppSelector(
    (state) => state.user.channels.find((channel) => channel.id === channelId),
    shallowEqual,
  );

  useEffect(() => {
    inputRef.current?.focus();

    if (!channel) {
      navigate('/');
    }
  }, [channel]);

  return (
    <Flex
      margin="0 auto"
      width="50%"
      height="100%"
      justifyContent="flex-end"
      gap={5}
      direction="column"
    >
      <Flex marginTop="auto" overflowY="auto" direction="column">
        {channel?.messages ?? 0 > 0 ? (
          channel?.messages.map((message) => (
            <Flex direction="column" key={message.id}>
              <Text>{message.owner.login}</Text>
              <Text>{message.text}</Text>
            </Flex>
          ))
        ) : (
          <Text>Нихера нет</Text>
        )}
      </Flex>
      <Input
        flexShrink={0}
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        flexShrink={0}
        onClick={() =>
          socket.emit('send_message', {
            ownerId: userId,
            channelId,
            text: value,
          })
        }
      >
        Отправить сообщение
      </Button>
    </Flex>
  );
};
