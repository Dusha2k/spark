import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../lib/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthCard } from '../components/AuthCard';
import { useMutation } from '@tanstack/react-query';
import { ApiError, AuthService } from '@/shared/openapi';
import { errorToast } from '@/shared/lib/toast';

type FormData = yup.InferType<typeof loginSchema>;
export const LoginForm = () => {
  const { mutate, isLoading } = useMutation(
    (data: FormData) => AuthService.authControllerLogin(data),
    {
      onError: (error: ApiError) => {
        errorToast({
          description: 'Не правильный логин или пароль',
        });
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: FormData) => mutate(data);
  return (
    <AuthCard title="Вход">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={!!errors.email?.message}>
          <FormLabel>Введите свой логин</FormLabel>
          <Input placeholder="Введите email" {...register('email')} />
          <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.password?.message}>
          <FormLabel>Введите свой пароль</FormLabel>
          <Input
            type="password"
            placeholder="Введите пароль"
            {...register('password')}
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>
        <Flex justifyContent="flex-end">
          <Button
            isLoading={isLoading}
            type="submit"
            marginTop={2}
            alignSelf="end"
          >
            Войти
          </Button>
        </Flex>
      </form>
    </AuthCard>
  );
};
