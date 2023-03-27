import { userAPI } from '@/shared/api';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const Channels = () => {
  const { data, isLoading } = useQuery(['current-user'], () =>
    userAPI.userControllerGetCurrent(),
  );
  return (
    <Box>
      <Text fontSize="3xl">Каналы</Text>
      {!isLoading && (
        <Flex>
          {data?.data?.channels?.map((channel) => (
            <Link to={`/app/${channel.id}`} key={channel.id}>
              <Flex>
                <Text>
                  {
                    channel.members.filter(
                      (member) => member.id !== data?.data?.id,
                    )[0].login
                  }
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      )}
    </Box>
  );
};
