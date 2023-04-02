import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { io } from 'socket.io-client';
import { errorToast } from '../lib/toast';
import {
  AuthClient,
  ChannelClient,
  Configuration,
  LocalFileClient,
  MessageClient,
  UserClient,
} from './openAPI';

export const socket = io('http://localhost:7777', {
  withCredentials: true,
  transports: ['websocket'],
  autoConnect: false,
});

const config = new Configuration();
export const axiosInstance = axios.create({
  withCredentials: true,
});
export const runAxiosInterceptors = (navigate: NavigateFunction) => {
  axiosInstance.interceptors.response.use(
    function (response: AxiosResponse) {
      return response;
    },
    function (error: AxiosError) {
      if (error?.response?.status === 401) {
        navigate('/login');
        errorToast({
          description: 'Пожалуйста авторизуйтесь',
        });
      }
    },
  );
};

const defaultSettings: [Configuration, string, AxiosInstance] = [
  config,
  import.meta.env.VITE_PUBLIC_HOST as string,
  axiosInstance,
];

export const authAPI = new AuthClient(...defaultSettings);

export const channelAPI = new ChannelClient(...defaultSettings);

export const messageAPI = new MessageClient(...defaultSettings);

export const userAPI = new UserClient(...defaultSettings);

export const fileAPI = new LocalFileClient(...defaultSettings);
