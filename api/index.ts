import { axiosInstance } from '../utils/axios';

export function sendImageApi (image:string) {
  return axiosInstance.post('/image', { image });
}