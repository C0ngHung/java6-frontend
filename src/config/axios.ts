import axios from 'axios';
import { API_BASE_URL } from './env';
import { STORAGE_KEYS } from '@/constants';
import { ROUTES } from '@/constants';
import type { ApiResponse } from '@/types/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (refreshToken) {
          const response = await axios.post<ApiResponse<{ accessToken: string }>>(
            `${API_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );

          if (response.data.success && response.data.data.accessToken) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

