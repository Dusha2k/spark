import Cookies from 'js-cookie';
import { socket } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks';
import {
  addMessage,
  changeSelfStatus,
  changeUserStatusInChannel,
} from '@/shared/store/userSlice';
import { useEffect } from 'react';

export const SocketsLayout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  // TODO: Проставить везде типы для data
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
    socket.on('self_status', (data) => dispatch(changeSelfStatus(data)));
    socket.on('new_tokens', (data) => {
      Cookies.set('access_token', data?.accessToken, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      });
      Cookies.set('refresh_token', data?.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    });
    return () => {
      socket.removeAllListeners('receive_message');
      socket.removeAllListeners('user_connected');
      socket.removeAllListeners('disconnected');
      socket.removeAllListeners('new_tokens');
    };
  }, []);

  return <>{children}</>;
};
