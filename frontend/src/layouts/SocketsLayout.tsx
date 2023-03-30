import { socket } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks';
import {
  addMessage,
  changeUserStatusInChannel,
} from '@/shared/store/userSlice';
import { useEffect } from 'react';

export const SocketsLayout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('receive_message', (data) => {
      dispatch(addMessage(data));
    });
    socket.on('user_connected', (data) => {
      dispatch(changeUserStatusInChannel({ ...data, status: 'online' }));
    });
    socket.on('user_disconnected', (data) => {
      dispatch(changeUserStatusInChannel({ ...data, status: 'offline' }));
    });
    return () => {
      socket.removeAllListeners('receive_message');
      socket.removeAllListeners('user_connected');
      socket.removeAllListeners('disconnected');
    };
  }, []);

  return <>{children}</>;
};
