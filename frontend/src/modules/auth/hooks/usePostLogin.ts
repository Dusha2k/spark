import { errorToast } from '@/shared/lib/toast';
import { AuthService } from '@/shared/openapi';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { FormLoginData } from '../lib/schemas';

export const usePostLogin = () => {
  const router = useRouter();
  return useMutation(
    (data: FormLoginData) => AuthService.authControllerLogin(data),
    {
      onSuccess: (data: { access_token: string }) => {
        localStorage.setItem('token', data.access_token);
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
