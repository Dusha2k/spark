import { Flex, Input, TextInput, Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { FormLoginData, loginSchema } from '../lib/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthCard } from '../components/AuthCard';
import { usePostLogin } from '../hooks/usePostLogin';

export const LoginForm = () => {
  const { mutate, isLoading } = usePostLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: FormLoginData) => mutate(data);
  return (
    <AuthCard title="Вход">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="email"
          required
          error={errors.email?.message}
          label="Введите свой email"
          placeholder="Введите email"
          {...register('email')}
        />
        <TextInput
          id="password"
          required
          type="password"
          error={errors.password?.message}
          label="Введите свой пароль"
          placeholder="Введите пароль"
          {...register('password')}
        />
        <Flex justify="flex-end">
          <Button
            loading={isLoading}
            type="submit"
            sx={{ marginTop: '2rem', alignSelf: 'end' }}
          >
            Войти
          </Button>
        </Flex>
      </form>
    </AuthCard>
  );
};
