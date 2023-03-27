import { authAPI } from '@/shared/api';
import { errorToast } from '@/shared/lib/toast';
import { FormLoginData } from '../lib/schemas';

export const usePostLogin = () => {
  return useMutation(
    (data: FormLoginData) => authAPI.authControllerLogin(data),
    {
      onSuccess: ({ data }) => {
        // router.push('/app');
      },
      onError: (error: ApiError) => {
        errorToast({
          description: 'Не правильный логин или пароль',
        });
      },
    },
  );
};
