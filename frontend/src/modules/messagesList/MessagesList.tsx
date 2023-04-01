import { socket } from '@/shared/api';
import { AutoResizeTextarea } from '@/shared/components';
import { useAppSelector } from '@/shared/hooks';
import { Button, Flex, Input, Text, Textarea } from '@chakra-ui/react';
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
      margin="0 auto"
      width="50%"
      height="100%"
      justifyContent="flex-end"
      gap={5}
      direction="column"
    >
      {channel?.messages ?? 0 > 0 ? (
        <Chat messages={channel?.messages ?? []} />
      ) : (
        <Text>Нихера нет</Text>
      )}
      <AutoResizeTextarea
        flexShrink={0}
        ref={inputRef}
        resize="none"
        value={value}
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
        flexShrink={0}
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
