import { useAppSelector } from '@/shared/hooks';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Channels = () => {
  const channels = useAppSelector(({ user }) => user.channels);
  const userId = useAppSelector(({ user }) => user.id);

  return (
    <Box>
      <Text fontSize="3xl">Каналы</Text>
      <Flex>
        {channels?.map((channel) => (
          <Link to={`/app/${channel.id}`} key={channel.id}>
            <Flex>
              <Text>
                {
                  channel.members.filter((member) => member.id !== userId)[0]
                    .login
                }
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};
