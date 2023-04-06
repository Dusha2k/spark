import { authAPI } from '@/shared/api';
import { RegisterDto } from '@/shared/api/openAPI';
import { successToast } from '@/shared/lib/toast';
import { useMutation } from '@tanstack/react-query';
import { UseFormReset } from 'react-hook-form';
import { FormRegisterData } from '../lib/schemas';

export const usePostRegister = (reset: UseFormReset<FormRegisterData>) => {
  return useMutation(
    (data: RegisterDto) => authAPI.authControllerRegister(data),
    {
      onSuccess: () => {
        successToast({
          message: 'Вы успешно зарегистрировались',
        });
        reset();
      },
    },
  );
};
