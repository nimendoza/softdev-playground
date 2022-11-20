import axios, { AxiosResponse } from 'axios';
import { UserEnum } from './UserEnum';

export const http = axios.create();

http.interceptors.request.use((config) => {
  const chit = localStorage.getItem(UserEnum.Chit);
  if (chit != null) {
    if (config.headers == null) {
      config.headers = {};
    }
    
    config.headers.Authorization = chit;
  }

  return config;
});

export type HttpResponse<T> = AxiosResponse<T>;
