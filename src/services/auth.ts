import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse } from '@/types/api';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutRequest,
  RegisterRequest,
  RegisterResponse,
  OtpSendRequest,
  OtpVerifyRequest,
  ActivationResponse,
} from '@/types/user';

export const authApi = {
  login: async (username: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        username,
        password,
      } as LoginRequest
    );
    return response.data;
  },

  register: async (request: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    const response = await axiosInstance.post<ApiResponse<RegisterResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      request
    );
    return response.data;
  },

  sendOtp: async (email: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.OTP_SEND, {
      email,
    } as OtpSendRequest);
    return response.data;
  },

  verifyOtp: async (email: string, otp: string): Promise<ApiResponse<ActivationResponse>> => {
    const response = await axiosInstance.post<ApiResponse<ActivationResponse>>(
      API_ENDPOINTS.AUTH.OTP_VERIFY,
      {
        email,
        otp,
      } as OtpVerifyRequest
    );
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> => {
    const response = await axiosInstance.post<ApiResponse<RefreshTokenResponse>>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      {
        refreshToken,
      } as RefreshTokenRequest
    );
    return response.data;
  },

  logout: async (token: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT, {
      token,
    } as LogoutRequest);
    return response.data;
  },
};

