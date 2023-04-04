import { Avatar } from '@/shared/components';
import { useAppSelector } from '@/shared/hooks';
// import { Avatar, Flex, Text, AvatarBadge } from '@chakra-ui/react';
import { Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const avatarId = useAppSelector((state) => state.user.avatarId);
  const nickname = useAppSelector((state) => state.user.nickname);
  const status = useAppSelector((state) => state.user.status);
  return (
    <Flex w="100%" px={10} py={3} bg="blackAlpha.200" align="center">
      <Flex ml="auto" align="center" gap={2}>
        <Text fz="xl">{nickname}</Text>
        <Avatar
          isOnline={status === 'online'}
          onClick={() => navigate('/app/profile')}
          avatar={
            avatarId
              ? `${import.meta.env.VITE_PUBLIC_HOST}/api/local-file/${avatarId}`
              : undefined
          }
        />
      </Flex>
    </Flex>
  );
};
