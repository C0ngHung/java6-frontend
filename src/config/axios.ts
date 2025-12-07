import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './env';
import { API_ENDPOINTS, STORAGE_KEYS, ROUTES } from '@/constants';
import type { ApiResponse } from '@/types/api';
import type { RefreshTokenResponse } from '@/types/user';

const REQUEST_TIMEOUT_MS = 30000;
const CONTENT_TYPE_JSON = 'application/json';
const BEARER_PREFIX = 'Bearer ';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': CONTENT_TYPE_JSON,
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `${BEARER_PREFIX}${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const HTTP_STATUS_UNAUTHORIZED = 401;

const clearAuthTokens = (): void => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

const redirectToLogin = (): void => {
  window.location.href = ROUTES.LOGIN;
};

const handleTokenRefresh = async (
  refreshToken: string,
  originalRequest: RetryableRequestConfig
): Promise<boolean> => {
  try {
    const response = await axios.post<ApiResponse<RefreshTokenResponse>>(
      `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
      { refreshToken }
    );

    if (response.data.success && response.data.data?.accessToken) {
      const newAccessToken = response.data.data.accessToken;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
      
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `${BEARER_PREFIX}${newAccessToken}`;
      }
      
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;

    if (
      error.response?.status === HTTP_STATUS_UNAUTHORIZED &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        const refreshSuccess = await handleTokenRefresh(refreshToken, originalRequest);
        
        if (refreshSuccess) {
          return axiosInstance(originalRequest);
        }
      }

      clearAuthTokens();
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

