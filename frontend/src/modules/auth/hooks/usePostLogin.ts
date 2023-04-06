import { authAPI, socket } from '@/shared/api';
import { useAppDispatch } from '@/shared/hooks';
import { errorToast } from '@/shared/lib/toast';
import { addUser } from '@/shared/store/userSlice';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FormLoginData } from '../lib/schemas';

export const usePostLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation(
    (data: FormLoginData) => authAPI.authControllerLogin(data),
    {
      onSuccess: ({ data }) => {
        dispatch(addUser(data));
        socket.connect();
        navigate('/app');
      },
      onError: () => {
        errorToast({
          message: 'Не правильный логин или пароль',
        });
      },
    },
  );
};
