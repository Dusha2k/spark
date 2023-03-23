import { authAPI } from '@/shared/api';
import { successToast } from '@/shared/lib/toast';
import { RegisterDto } from '@/shared/openapi';
import { useMutation } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';
import { FormRegisterData } from '../lib/schemas';

export const usePostRegister = (reset: UseFormReset<FormRegisterData>) => {
  return useMutation(
    (data: RegisterDto) => authAPI.authControllerRegister(data),
    {
      onSuccess: () => {
        successToast({
          title: 'Вы успешно зарегистрировались',
        });
        reset();
      },
    },
  );
};
