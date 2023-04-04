import { socket } from '@/shared/api';
import { useAppSelector } from '@/shared/hooks';
import { Button, Flex, Text, Textarea } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Chat } from './components/Chat';

export const MessagesList = ({ channelId }: { channelId: number }) => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
      m="0 auto"
      w="50%"
      h="100%"
      justify="flex-end"
      gap={5}
      direction="column"
    >
      {channel?.messages ?? 0 > 0 ? (
        <Chat messages={channel?.messages ?? []} />
      ) : (
        <Text>Нихера нет</Text>
      )}
      <Textarea
        ref={inputRef}
        autosize
        value={value}
        maxRows={4}
        sx={{ flexShrink: 0 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (value.length > 0) {
              socket.emit('send_message', {
                ownerId: userId,
                channelId,
                text: value,
              });
              setValue('');
            }
          }
        }}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        sx={{ flexShrink: 0 }}
        onClick={() => {
          if (value.length > 0) {
            socket.emit('send_message', {
              ownerId: userId,
              channelId,
              text: value,
            });
            setValue('');
          }
        }}
      >
        Отправить сообщение
      </Button>
    </Flex>
  );
};
