import { useAppSelector } from '@/shared/hooks';
import { Avatar, Flex, Text, AvatarBadge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const avatarId = useAppSelector((state) => state.user.avatarId);
  const nickname = useAppSelector((state) => state.user.nickname);
  const status = useAppSelector((state) => state.user.status);
  return (
    <Flex
      backgroundColor="blackAlpha.200"
      rounded="md"
      width="100%"
      paddingX={10}
      paddingY={3}
      alignItems="center"
    >
      <Flex marginLeft="auto" alignItems="center" gap={2}>
        <Text fontSize="xl">{nickname}</Text>
        <Avatar
          onClick={() => navigate('/app/profile')}
          cursor="pointer"
          name="Аватар"
          src={`${import.meta.env.VITE_PUBLIC_HOST}/api/local-file/${avatarId}`}
        >
          <AvatarBadge
            bg={status === 'offline' ? 'gray.300' : 'green.300'}
            boxSize="1em"
          />
        </Avatar>
      </Flex>
    </Flex>
  );
};
