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
    ADMIN: '/orders/admin',
    UPDATE: '/orders/{orderId}',
    DELETE: '/orders/{orderId}',
  },
  USER: {
    BASE: '/users',
    SEARCH: '/users/search',
    ACTIVATE: '/users/{id}/activate',
    DEACTIVATE: '/users/{id}/deactivate',
    ASSIGN_ROLE: '/users/{id}/roles/{roleId}',
    REMOVE_ROLE: '/users/{id}/roles/{roleId}',
    GET_ROLES: '/users/{id}/roles',
  },
  ROLE: {
    BASE: '/roles',
    SEARCH: '/roles',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  ORDERS: '/orders',
  ADMIN_DASHBOARD: '/admin/dashboard',
  FORGOT_PASSWORD: '/forgot-password',
  PASSWORD_RESET: '/password-reset',
  OTP_VERIFICATION: '/otp-verification',
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRATION_MINUTES: 15,
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
export type Routes = typeof ROUTES;
export type StorageKeys = typeof STORAGE_KEYS;
export type OtpConfig = typeof OTP_CONFIG;

