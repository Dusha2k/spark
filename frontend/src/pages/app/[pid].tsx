import { MessagesList } from '@/modules/messagesList';
import { messageAPI } from '@/shared/api';
import { CreateMessageDto } from '@/shared/api/openAPI';
import { Button, Input, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AppDetails() {
  const [value, setValue] = useState('');
  const router = useRouter();
  const { pid } = router.query;
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(['current-user']);
  const { mutate, isLoading } = useMutation((data: CreateMessageDto) =>
    messageAPI.messageControllerCreate(data),
  );

  useEffect(() => {
    if (!pid) {
      router.push('/app');
    }
  }, [pid]);

  if (!pid) {
    return;
  }

  return (
    <Text>
      <MessagesList channelId={+pid as number} />
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        onClick={() =>
          mutate({
            channelId: +pid as number,
            ownerId: +user?.data?.id,
            text: value,
          })
        }
      >
        Отправить сообщение
      </Button>
    </Text>
  );
}
