import { Avatar as MantineAvatar, Indicator } from '@mantine/core';

interface Props {
  isOnline?: boolean;
  avatar?: string;
  onClick?: () => void;
}

export const Avatar = ({ isOnline, avatar, onClick }: Props) => {
  return (
    <Indicator
      inline
      size={16}
      offset={7}
      position="bottom-end"
      color={isOnline ? 'green.6' : 'red.6'}
      withBorder
    >
      <MantineAvatar onClick={() => onClick?.()} radius="xl" src={avatar} />
    </Indicator>
  );
};
