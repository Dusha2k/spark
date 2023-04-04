import { UserEntity } from '@/shared/api/openAPI';
import { useAppSelector } from '@/shared/hooks';
import { Box, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const User = ({ user }: { user: UserEntity }) => {
  return (
    <Flex>
      <Text>{user.nickname}</Text>
      <Text>{user.status}</Text>
    </Flex>
  );
};

export const Channels = () => {
  const channels = useAppSelector(({ user }) => user.channels);
  const userId = useAppSelector(({ user }) => user.id);

  return (
    <Box>
      <Text fz="xl">Каналы</Text>
      <Flex>
        {channels?.map((channel) => (
          <Link to={`/app/${channel.id}`} key={channel.id}>
            <Flex>
              <Text>
                <User
                  user={
                    channel.members.filter((member) => member.id !== userId)[0]
                  }
                />
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};
