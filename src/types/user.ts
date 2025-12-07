export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
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
  tokenType: string;
  expiresIn: number;
  userId: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  roles: string[];
  permissions: string[];
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
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

export interface UserUpdateRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
}

export interface UserResponseDto {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateDto {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phone?: string;
}

export interface UserUpdateDto {
  fullName?: string;
  password?: string;
  email?: string;
  phone?: string;
}

export interface UserRoleResponseDto {
  userId: number;
  username: string;
  roleId: number;
  roleCode: string;
  roleName: string;
}