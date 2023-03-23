import { authAPI } from '@/shared/api';
import { errorToast } from '@/shared/lib/toast';
import { useMutation } from '@tanstack/react-query';
import { getCookies } from 'cookies-next';
import { ApiError } from 'next/dist/server/api-utils';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { FormLoginData } from '../lib/schemas';

export const usePostLogin = () => {
  const router = useRouter();
  return useMutation(
    (data: FormLoginData) => authAPI.authControllerLogin(data),
    {
      onSuccess: ({ data }) => {
        console.log(getCookies('access_token', {}));
        router.push('/app');
      },
      onError: (error: ApiError) => {
        errorToast({
          description: 'Не правильный логин или пароль',
        });
      },
    },
  );
};
