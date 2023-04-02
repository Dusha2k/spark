import { axiosInstance, userAPI } from '@/shared/api';
import { UserEntity } from '@/shared/api/openAPI';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { updateUserAvatar } from '@/shared/store/userSlice';
import { Box, Button, Input } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

export const Profile = () => {
  const [file, setFile] = useState<File | undefined>();
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

  const sendImage = () => {
    const data = new FormData();
    data.append('file', file as any);
    mutate(data);
  };

  return (
    <>
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
        <Button isLoading={isLoading} onClick={sendImage} disabled={!file}>
          Загрузить
        </Button>
      </Box>
    </>
  );
};
