import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:'http://192.168.100.5:4000/'
});