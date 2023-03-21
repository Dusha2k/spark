import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { FormRegisterData, registerSchema } from '../lib/schemas';
import { usePostRegister } from '../hooks/usePostRegister';
import { AuthCard } from '../components/AuthCard';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormRegisterData>({
    resolver: yupResolver(registerSchema),
  });
  const { mutate, isLoading } = usePostRegister(reset);
  const onSubmit = ({ passwordConfirmation, ...data }: FormRegisterData) =>
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
