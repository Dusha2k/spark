import { userAPI } from '@/shared/api';
import { Image } from '@/shared/components';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo } from 'react';

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
            <Link href={`/app/${channel.id}`} key={channel.id}>
              <Flex>
                <Image
                  src="/discord-avatar.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  w="40px"
                  h="40px"
                  rounded="full"
                />
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
