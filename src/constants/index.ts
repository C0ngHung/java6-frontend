// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    OTP_SEND: '/auth/otp/send',
    OTP_VERIFY: '/auth/otp/verify',
  },
  PRODUCT: {
    BASE: '/products',
  },
  CATEGORY: {
    BASE: '/categories',
  },
  CART: {
    BASE: '/carts',
  },
  ORDER: {
    BASE: '/orders',
  },
  USER: {
    BASE: '/users',
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  FORGOT_PASSWORD: '/forgot-password',
  PASSWORD_RESET: '/password-reset',
  OTP_VERIFICATION: '/otp-verification',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

// OTP Configuration
export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRATION_MINUTES: 15,
} as const;

