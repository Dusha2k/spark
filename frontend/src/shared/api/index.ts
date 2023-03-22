import axios, { AxiosInstance } from 'axios';
import { AuthClient, Configuration } from './openAPI';

const config = new Configuration();
const axiosInstance = axios.create();

const defaultSettings: [Configuration, string, AxiosInstance] = [
  config,
  import.meta.env.VITE_PUBLIC_HOST as string,
  axiosInstance,
];

export const authAPI = new AuthClient(...defaultSettings);
