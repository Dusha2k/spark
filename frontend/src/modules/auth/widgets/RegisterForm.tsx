import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, Input, Button, TextInput } from '@mantine/core';
import { FormRegisterData, registerSchema } from '../lib/schemas';
import { usePostRegister } from '../hooks/usePostRegister';
import { AuthCard } from '../components/AuthCard';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormRegisterData>({
    resolver: yupResolver(registerSchema),
  });
  const { mutate, isLoading } = usePostRegister(reset);
  const onSubmit = ({ passwordConfirmation, ...data }: FormRegisterData) =>
    mutate(data);

  return (
    <AuthCard title="Зарегистрироваться">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="nickname"
          placeholder="Введите никнейм"
          error={errors.nickname?.message}
          label="Введите свой никнейм"
          required
          {...register('nickname')}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="Введите email"
          error={errors.email?.message}
          label="Введите свой email"
          required
          {...register('email')}
        />
        <TextInput
          id="password"
          type="password"
          placeholder="Введите пароль"
          error={errors.password?.message}
          label="Введите свой пароль"
          required
          {...register('password')}
        />
        <TextInput
          id="passwordConfirmation"
          type="password"
          placeholder="Повторите пароль"
          error={errors.passwordConfirmation?.message}
          label="Повторите свой пароль"
          required
          {...register('passwordConfirmation')}
        />
        <Flex justify="flex-end">
          <Button
            loading={isLoading}
            type="submit"
            sx={{ marginTop: '2rem', alignSelf: 'end' }}
          >
            Регистрация
          </Button>
        </Flex>
      </form>
    </AuthCard>
  );
};
