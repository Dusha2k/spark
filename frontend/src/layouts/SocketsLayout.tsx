import { socket } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks';
import { addMessage } from '@/shared/store/userSlice';
import { useEffect } from 'react';

export const SocketsLayout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('here')
      dispatch(addMessage(data));
    });
    return () => {
      socket.removeAllListeners('receive_message');
    };
  }, []);

  return <>{children}</>;
};
