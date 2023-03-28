import { MessagesList } from '@/modules/messagesList';
import { useParams } from 'react-router-dom';

export const Details = () => {
  const { id } = useParams();
  return (
    <>
      <MessagesList channelId={Number(id as string)} />
    </>
  );
};
