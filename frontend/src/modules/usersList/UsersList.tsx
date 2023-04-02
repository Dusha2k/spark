import { channelAPI, userAPI } from '@/shared/api';
import {
  Flex,
  Text,
  Popover,
  PopoverContent,
  Portal,
  PopoverTrigger,
  PopoverBody,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';

export const UsersList = () => {
  const { data, isLoading } = useQuery(['users'], () =>
    userAPI.userControllerGetAllUsers(),
  );

  const { mutate } = useMutation((members: string[]) =>
    channelAPI.channelControllerCreate({
      members,
    }),
  );

  return (
    <Flex padding="15px" gap={3} alignItems="flex-start" direction="column">
      {!isLoading && (
        <>
          {data?.data?.map((user) => (
            <Popover key={user.id}>
              <PopoverTrigger>
                <Flex cursor="pointer" gap={3} alignItems="flex-start">
                  <Text>{user.nickname}</Text>
                </Flex>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverBody onClick={() => mutate(['14', '15'])}>
                    Написать сообщение
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          ))}
        </>
      )}
    </Flex>
  );
};
