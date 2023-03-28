import { socket, userAPI } from '@/shared/api';
import { FullScreenLoader } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { addUser } from '@/shared/store/userSlice';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

const closedRoutes = ['/app'];
const openRoutes = ['/', '/login', '/register'];

export const InitLayout = ({ children }: { children: JSX.Element }) => {
  const [isAuthCheck, setIsAuthCheck] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [token] = useState(Cookies.get('access_token'));

  const { mutate: getUser, isLoading } = useMutation(
    () => userAPI.userControllerGetCurrent(),
    {
      onSuccess(data) {
        dispatch(addUser(data?.data));
        socket.connect();
        if (openRoutes.includes(pathname)) {
          navigate('/app');
        }
      },
    },
  );

  const initApp = () => {
    if (openRoutes.includes(pathname)) {
      // На открытом роуте с токен значит запрашиваем данные и потом редирект
      if (token) {
        getUser();
      } else {
        // Ждем пока пользователь авторизуется
      }
    } else {
      // На закрытом роуте без токен - перенаправление
      if (!token) {
        navigate('/');
        // На закрытом роуте с токен значит все ок запрашиваем данные и потом редирект
      } else {
        getUser();
      }
    }
  };

  useEffect(() => {
    initApp();
    setIsAuthCheck(true);
  }, []);

  if (isLoading || !isAuthCheck) {
    return <FullScreenLoader />;
  }
  return <>{children}</>;
};
