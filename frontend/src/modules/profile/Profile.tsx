import { axiosInstance, userAPI } from '@/shared/api';
import { UserEntity } from '@/shared/api/openAPI';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { updateUserAvatar, updateUserNickname } from '@/shared/store/userSlice';
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

export const Profile = () => {
  const [file, setFile] = useState<File | undefined>();
  const [isRedactName, setIsRedactName] = useState(false);
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

  const sendImage = () => {
    const data = new FormData();
    data.append('file', file as any);
    mutate(data);
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
        <Button isLoading={isLoading} onClick={sendImage} disabled={!file}>
          Загрузить
        </Button>
      </Box>
      <Box>
        <InputGroup>
          <Input
            defaultValue={nickname}
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            disabled={!isRedactName || isUpdatingNickname}
            minLength={1}
            maxLength={10}
          />
          {!isUpdatingNickname && (
            <>
              {isRedactName ? (
                <InputRightElement gap={1} w="4rem">
                  <Icon
                    flex="1"
                    cursor="pointer"
                    onClick={() => setIsRedactName(false)}
                    as={AiOutlineClose}
                  />
                  <Icon
                    flex="1"
                    cursor="pointer"
                    onClick={() => {
                      if (currentName && currentName?.length > 0) {
                        updateName(currentName);
                      }
                    }}
                    as={AiOutlineCheck}
                  />
                </InputRightElement>
              ) : (
                <InputRightElement
                  cursor="pointer"
                  onClick={() => setIsRedactName(true)}
                >
                  <Icon as={AiOutlineEdit} />
                </InputRightElement>
              )}
            </>
          )}
          {isUpdatingNickname && (
            <InputRightElement>
              <Spinner />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
    </Flex>
  );
};
