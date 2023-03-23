import axios from 'axios';
import { AuthClient, Configuration } from './openAPI';

const config = new Configuration();
const axiosInstance = axios.create({
  withCredentials: true,
});

export const authAPI = new AuthClient(
  config,
  process.env.NEXT_PUBLIC_HOST,
  axiosInstance,
);
