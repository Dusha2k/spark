import { Avatar as ChakraAvatar, AvatarBadge } from '@chakra-ui/react';

export const Avatar = () => {
  return (
    <ChakraAvatar>
      <AvatarBadge boxSize="1.25em" bg="grey.500" />
    </ChakraAvatar>
  );
};
