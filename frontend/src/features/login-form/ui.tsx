import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './lib';
import * as yup from 'yup';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from '@chakra-ui/react';

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
    <Flex direction="column">
      <Text marginBottom={2} fontSize="2xl" align="center">
        Вход
      </Text>
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
    </Flex>
  );
};
