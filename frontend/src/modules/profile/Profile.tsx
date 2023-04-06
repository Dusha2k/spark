import { authAPI, axiosInstance, userAPI } from '@/shared/api';
import { UserEntity } from '@/shared/api/openAPI';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { updateUserAvatar, updateUserNickname } from '@/shared/store/userSlice';
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import {
  Box,
  Button,
  Flex,
  ActionIcon,
  Input,
  Loader,
  TextInput,
  PasswordInput,
  Text,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInputWithPopover } from '@/shared/components/input/PasswordInputWithPopover';
import { ChangePasswordData, changePasswordSchema } from './lib/schemas';
import { errorToast, successToast } from '@/shared/lib/toast';

export const Profile = () => {
  const [file, setFile] = useState<File | undefined>();
  const [isRedactName, setIsRedactName] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const [currentName, setCurrentName] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const avatar = useAppSelector((state) => state.user.avatarId);
  const nickname = useAppSelector((state) => state.user.nickname);
  const { mutate, isLoading } = useMutation(
    (data: FormData): Promise<AxiosResponse<UserEntity>> =>
      axiosInstance.post(
        `${import.meta.env.VITE_PUBLIC_HOST}/api/user/avatar`,
        data,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      ),
    {
      onSuccess({ data }) {
        if (data?.avatarId) {
          dispatch(updateUserAvatar(data.avatarId));
        }
      },
    },
  );

  const { mutate: updateName, isLoading: isUpdatingNickname } = useMutation(
    (nickname: string) =>
      userAPI.userControllerChangeUserNickname({ nickname }),
    {
      onSuccess({ data }) {
        dispatch(updateUserNickname(data.nickname));
        setIsRedactName(false);
      },
    },
  );

  const { mutate: updatePassword, isLoading: isUpdatingPassword } = useMutation(
    ({ oldPassword, password }: ChangePasswordData) =>
      authAPI.authControllerChangePassword({
        oldPassword: oldPassword,
        password: password,
      }),
    {
      onSuccess: () => {
        reset();
        successToast({
          message: 'Пароль успешно сменен',
        });
      },
      onError: () => {
        errorToast({
          message: 'Пароль не верный',
        });
      },
    },
  );

  const sendImage = () => {
    const data = new FormData();
    data.append('file', file as any);
    mutate(data);
  };

  const onSubmit = (values: ChangePasswordData) => {
    updatePassword(values);
  };

  return (
    <Flex direction="column" gap={3}>
      <Box>
        <Input
          type="file"
          title="Загрузите аватар"
          placeholder="Загрузите аватар"
          onChange={(e) => {
            if (e.target?.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button loading={isLoading} onClick={sendImage} disabled={!file}>
          Загрузить
        </Button>
      </Box>
      <Box>
        <TextInput
          rightSection={
            isUpdatingNickname ? (
              <Loader size="xs" />
            ) : (
              <>
                {isRedactName ? (
                  <Flex>
                    <ActionIcon
                      onClick={() => setIsRedactName(false)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <AiOutlineClose />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => updateName(currentName ?? nickname)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <AiOutlineCheck />
                    </ActionIcon>
                  </Flex>
                ) : (
                  <ActionIcon
                    onClick={() => setIsRedactName(true)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <AiOutlineEdit />
                  </ActionIcon>
                )}
              </>
            )
          }
          defaultValue={nickname}
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          disabled={!isRedactName || isUpdatingNickname}
          minLength={1}
          maxLength={10}
        />
      </Box>
      <Text size="xl">Смена пароля</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={5} direction="column">
          <PasswordInput
            withAsterisk
            error={errors.oldPassword?.message}
            label="Старый пароль"
            placeholder="Старый пароль"
            {...register('oldPassword')}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <PasswordInputWithPopover
                withAsterisk
                label="Новый пароль"
                placeholder="Новый пароль"
                error={errors.password?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <PasswordInput
            withAsterisk
            label="Повторите пароль"
            placeholder="Повторите пароль"
            error={errors.repeatPassword?.message}
            {...register('repeatPassword')}
          />
          <Button
            disabled={isUpdatingPassword}
            ml="auto"
            mt="0.5rem"
            type="submit"
          >
            Сменить
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
