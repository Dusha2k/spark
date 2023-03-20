import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from '@chakra-ui/react';
import { registerSchema } from '../lib/schemas';
import { AuthCard } from '../components/AuthCard';
import { useMutation } from '@tanstack/react-query';
import { AuthService, RegisterDto } from '@/shared/openapi';

type FormData = yup.InferType<typeof registerSchema>;
export const RegisterForm = () => {
  const { mutate, isLoading } = useMutation((data: RegisterDto) =>
    AuthService.authControllerRegister(data),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = ({ passwordConfirmation, ...data }: FormData) =>
    mutate(data);

  return (
    <AuthCard title="Зарегистрироваться">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={!!errors.login?.message}>
          <FormLabel>Введите свой логин</FormLabel>
          <Input placeholder="Введите логин" {...register('login')} />
          <FormHelperText>{errors.login?.message}</FormHelperText>
        </FormControl>
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
        <FormControl
          isRequired
          isInvalid={!!errors.passwordConfirmation?.message}
        >
          <FormLabel>Повторите свой пароль</FormLabel>
          <Input
            type="password"
            placeholder="Повторите пароль"
            {...register('passwordConfirmation')}
          />
          <FormHelperText>
            {errors.passwordConfirmation?.message}
          </FormHelperText>
        </FormControl>
        <Flex justifyContent="flex-end">
          <Button
            isLoading={isLoading}
            type="submit"
            onClick={() => console.log('clck')}
            marginTop={2}
            alignSelf="end"
          >
            Регистрация
          </Button>
        </Flex>
      </form>
    </AuthCard>
  );
};
