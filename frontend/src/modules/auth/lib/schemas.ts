import * as yup from 'yup';

export type FormLoginData = yup.InferType<typeof loginSchema>;
export const loginSchema = yup.object().shape({
  email: yup.string().required('Это поле обязательное'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть более 6 символов')
    .required('Это поле обязательное'),
});

export type FormRegisterData = yup.InferType<typeof registerSchema>;
export const registerSchema = yup.object().shape({
  nickname: yup.string().required('Это поле обязательное'),
  email: yup
    .string()
    .email('Введите правильный формат')
    .required('Это поле обязательное'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть более 6 символов')
    .required('Это поле обязательное'),
  passwordConfirmation: yup
    .string()
    .min(6, 'Пароль должен быть более 6 символов')
    .oneOf([yup.ref('password'), undefined], 'Пароли не совпадают'),
});
