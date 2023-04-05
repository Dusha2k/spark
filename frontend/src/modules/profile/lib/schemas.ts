import * as yup from 'yup';

export type ChangePasswordData = yup.InferType<typeof changePasswordSchema>;
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, 'Пароль должен быть более 6 символов')
    .required('Это поле обязательное'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть более 6 символов')
    .required('Это поле обязательное'),
  repeatPassword: yup
    .string()
    .min(6, 'Пароль должен быть более 6 символов')
    .oneOf([yup.ref('password'), undefined], 'Пароли не совпадают'),
});
