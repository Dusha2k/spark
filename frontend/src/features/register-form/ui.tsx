import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './lib';
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

type FormData = yup.InferType<typeof registerSchema>;
export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
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
          <Button type="submit" marginTop={2} alignSelf="end">
            Регистрация
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
