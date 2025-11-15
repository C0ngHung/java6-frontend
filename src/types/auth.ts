export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface PasswordResetRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordResetResponse {
  message: string;
  success: boolean;
}

export interface SignUpRequest {
  name: string;
  email_phone: string;
  password: string;
}

export interface SignUpResponse {
  userId: number;
  message: string;
  success: boolean;
}

