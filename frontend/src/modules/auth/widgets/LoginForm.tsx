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
import { loginSchema } from '../helpers/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthCard } from '../components/AuthCard';

type FormData = yup.InferType<typeof loginSchema>;
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: FormData) => console.log(data);
  return (
    <AuthCard title="Вход">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={!!errors.login?.message}>
          <FormLabel>Введите свой логин</FormLabel>
          <Input placeholder="Введите логин" {...register('login')} />
          <FormHelperText>{errors.login?.message}</FormHelperText>
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
          <Button type="submit" marginTop={2} alignSelf="end">
            Войти
          </Button>
        </Flex>
      </form>
    </AuthCard>
  );
};
