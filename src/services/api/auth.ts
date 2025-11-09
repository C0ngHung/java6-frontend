import axiosInstance from '@/config/axios';
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
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', {
      username,
      password,
    } as LoginRequest);
    return response.data;
  },

  register: async (request: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    const response = await axiosInstance.post<ApiResponse<RegisterResponse>>('/auth/register', request);
    return response.data;
  },

  sendOtp: async (email: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/otp/send', {
      email,
    } as OtpSendRequest);
    return response.data;
  },

  verifyOtp: async (email: string, otp: string): Promise<ApiResponse<ActivationResponse>> => {
    const response = await axiosInstance.post<ApiResponse<ActivationResponse>>('/auth/otp/verify', {
      email,
      otp,
    } as OtpVerifyRequest);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> => {
    const response = await axiosInstance.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh-token', {
      refreshToken,
    } as RefreshTokenRequest);
    return response.data;
  },

  logout: async (token: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/logout', {
      token,
    } as LogoutRequest);
    return response.data;
  },
};

