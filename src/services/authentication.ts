import axiosInstance from '@/apis/axiosInstance.ts';
import ENDPOINTS from '@/apis/endpoints.ts';

export const authenticateApp = () =>
  axiosInstance.get(ENDPOINTS.AUTH.GET_AUTHENTICATION);
