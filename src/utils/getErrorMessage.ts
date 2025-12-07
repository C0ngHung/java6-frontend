import { ERROR_MESSAGES, HTTP_STATUS_MESSAGES, DEFAULT_ERROR_MESSAGES } from './errorMessages';
import type { AxiosError } from 'axios';

export { DEFAULT_ERROR_MESSAGES, ERROR_MESSAGES, HTTP_STATUS_MESSAGES } from './errorMessages';

interface ErrorWithCode {
  code?: string | number;
}

interface ApiErrorResponse {
  error?: {
    code?: string | number;
    message?: string;
  };
}

const RADIX_DECIMAL = 10;

const parseErrorCode = (code: string | number | undefined): number | null => {
  if (code === undefined) {
    return null;
  }

  const parsed = typeof code === 'string' ? parseInt(code, RADIX_DECIMAL) : code;
  return !isNaN(parsed) && typeof parsed === 'number' ? parsed : null;
};

const getErrorCodeFromAxiosError = (error: AxiosError<ApiErrorResponse>): number | null => {
  const responseData = error.response?.data;
  const errorCodeStr = responseData?.error?.code;
  return parseErrorCode(errorCodeStr);
};

const getErrorCodeFromGenericError = (error: ErrorWithCode): number | null => {
  return parseErrorCode(error.code);
};

export function getErrorMessage(
  error: unknown,
  defaultMessage: string = DEFAULT_ERROR_MESSAGES.GENERIC
): string {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorCode = getErrorCodeFromAxiosError(axiosError);

    if (errorCode !== null && ERROR_MESSAGES[errorCode]) {
      return ERROR_MESSAGES[errorCode];
    }

    const statusCode = axiosError.response?.status;
    if (statusCode && HTTP_STATUS_MESSAGES[statusCode]) {
      return HTTP_STATUS_MESSAGES[statusCode];
    }
  }

  if (error && typeof error === 'object' && 'code' in error) {
    const errorCode = getErrorCodeFromGenericError(error as ErrorWithCode);
    if (errorCode !== null && ERROR_MESSAGES[errorCode]) {
      return ERROR_MESSAGES[errorCode];
    }
  }

  return defaultMessage;
}

interface AxiosErrorLike {
  isAxiosError?: boolean;
}

function isAxiosError(error: unknown): error is AxiosError {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const errorLike = error as AxiosErrorLike;
  return errorLike.isAxiosError === true;
}

export function getErrorMessageWithFallback(
  error: unknown,
  defaultMessage: string = DEFAULT_ERROR_MESSAGES.GENERIC,
  useBackendMessage: boolean = false
): string {
  if (useBackendMessage && isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const responseData = axiosError.response?.data;
    const backendMessage = responseData?.error?.message;

    if (backendMessage && typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
  }

  const customMessage = getErrorMessage(error, '');

  if (customMessage && customMessage !== defaultMessage && customMessage.trim()) {
    return customMessage;
  }

  return defaultMessage;
}

