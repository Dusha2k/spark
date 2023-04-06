import { channelAPI, userAPI } from '@/shared/api';
import { useAppSelector } from '@/shared/hooks';
import { Popover, Flex, Text, Box } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { stat } from 'fs';
import { useNavigate } from 'react-router-dom';

export const UsersList = () => {
  const currentUserId = useAppSelector((state) => state.user.id);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['users'], () =>
    userAPI.userControllerGetAllUsers(),
  );

  const { mutate } = useMutation(
    (members: number[]) =>
      channelAPI.channelControllerCreate({
        members,
      }),
    {
      onSuccess: ({ data }) => {
        navigate(`/app/${data.id}`);
      },
    },
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
                <Box onClick={() => mutate([currentUserId, user.id])}>
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
