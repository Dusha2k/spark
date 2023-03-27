import axios, { AxiosInstance } from 'axios';
import { io } from 'socket.io-client';
import {
  AuthClient,
  ChannelClient,
  Configuration,
  MessageClient,
  UserClient,
} from './openAPI';

export const socket = io('http://localhost:7777', {
  withCredentials: true,
  transports: ['websocket'],
});

const config = new Configuration();
export const axiosInstance = axios.create({
  withCredentials: true,
});

const defaultSettings: [Configuration, string, AxiosInstance] = [
  config,
  import.meta.env.VITE_PUBLIC_HOST as string,
  axiosInstance,
];

export const authAPI = new AuthClient(...defaultSettings);

export const channelAPI = new ChannelClient(...defaultSettings);

export const messageAPI = new MessageClient(...defaultSettings);

export const userAPI = new UserClient(...defaultSettings);
