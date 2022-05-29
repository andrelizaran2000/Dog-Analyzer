import { axiosInstance } from '../utils/axios';

export function sendImageApi (image:string) {
  return axiosInstance.post<{ isDog:boolean }>('/predict', { image:image.replaceAll(" ","+") });
}