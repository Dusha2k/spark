import { channelAPI, userAPI } from '@/shared/api';
import { Popover, Flex, Text, Box } from '@mantine/core';
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
    <Flex p="15px" gap={3} align="flex-start" direction="column">
      {!isLoading && (
        <>
          {data?.data?.map((user) => (
            <Popover key={user.id}>
              <Popover.Target>
                <Flex gap={3} align="flex-start" sx={{ cursor: 'pointer' }}>
                  <Text>{user.nickname}</Text>
                </Flex>
              </Popover.Target>
              <Popover.Dropdown>
                <Box onClick={() => mutate(['14', '15'])}>
                  Написать сообщение
                </Box>
              </Popover.Dropdown>
            </Popover>
          ))}
        </>
      )}
    </Flex>
  );
};
