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

/**
 * Authentication API service
 * Handles all authentication-related API calls
 */
export const authApi = {
  /**
   * Login with username and password
   * Note: Password is sent in plain text but encrypted via HTTPS
   * Backend uses BCrypt for password hashing
   * @param username - User's username
   * @param password - User's password
   * @returns Promise with login response containing tokens and user info
   */
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

  /**
   * Register a new user account
   * Note: Password is sent in plain text but encrypted via HTTPS
   * Backend uses BCrypt for password hashing
   * @param request - Registration data (username, password, email, fullName, phone)
   * @returns Promise with registration response
   */
  register: async (request: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    const response = await axiosInstance.post<ApiResponse<RegisterResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      request
    );
    return response.data;
  },

  /**
   * Send OTP to user's email for account activation
   * @param email - User's email address
   * @returns Promise with void response
   */
  sendOtp: async (email: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.OTP_SEND, {
      email,
    } as OtpSendRequest);
    return response.data;
  },

  /**
   * Verify OTP code for account activation
   * @param email - User's email address
   * @param otp - OTP code to verify
   * @returns Promise with activation response
   */
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

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Refresh token
   * @returns Promise with new access token
   */
  refreshToken: async (refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> => {
    const response = await axiosInstance.post<ApiResponse<RefreshTokenResponse>>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      {
        refreshToken,
      } as RefreshTokenRequest
    );
    return response.data;
  },

  /**
   * Logout user and invalidate token
   * @param token - Access token to invalidate
   * @returns Promise with void response
   */
  logout: async (token: string): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT, {
      token,
    } as LogoutRequest);
    return response.data;
  },
};

