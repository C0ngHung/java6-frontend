export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  isActive: boolean;
  role?: string;
  authorities?: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  authorities: string[];
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface LogoutRequest {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phone?: string;
}

export interface RegisterResponse {
  userId: number;
  username: string;
  email: string;
  message: string;
  requiresActivation: boolean;
}

export interface OtpSendRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}

export interface ActivationResponse {
  message: string;
  userId: number;
  activated: boolean;
}

