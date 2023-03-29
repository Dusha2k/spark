import { authAPI, runAxiosInterceptors, socket, userAPI } from '@/shared/api';
import { FullScreenLoader } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { addUser } from '@/shared/store/userSlice';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
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

  const { mutate: checkToken, isLoading: isLoadingCheckToken } = useMutation(
    () => authAPI.authControllerCheckRefreshToken(),
    {
      onSuccess(data) {
        if (data) {
          getUser();
        } else {
          navigate('/login');
        }
      },
    },
  );

  useEffect(() => {
    runAxiosInterceptors(navigate);
    checkToken();
    setIsAuthCheck(true);
  }, []);

  if (isLoading || !isAuthCheck || isLoadingCheckToken) {
    return <FullScreenLoader />;
  }
  return <>{children}</>;
};
