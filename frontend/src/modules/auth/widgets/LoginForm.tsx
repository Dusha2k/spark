import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from '@chakra-ui/react';
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
        <FormControl isRequired isInvalid={!!errors.email?.message}>
          <FormLabel>Введите свой email</FormLabel>
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
