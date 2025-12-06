import { ERROR_MESSAGES, HTTP_STATUS_MESSAGES, DEFAULT_ERROR_MESSAGES } from './errorMessages';
import type { AxiosError } from 'axios';

// Re-export for convenience
export { DEFAULT_ERROR_MESSAGES, ERROR_MESSAGES, HTTP_STATUS_MESSAGES } from './errorMessages';

/**
 * Get custom error message from backend error response
 * Priority: Error Code > HTTP Status > Default Message
 * 
 * @param error - Axios error or any error object
 * @param defaultMessage - Default message to use if no mapping found
 * @returns Custom error message string
 */
export function getErrorMessage(
  error: unknown,
  defaultMessage: string = DEFAULT_ERROR_MESSAGES.GENERIC
): string {
  // Handle Axios errors
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;

    // Try to get error code from response data
    const errorCode = axiosError.response?.data?.code;
    if (errorCode && ERROR_MESSAGES[errorCode]) {
      return ERROR_MESSAGES[errorCode];
    }

    // Try to get HTTP status code
    const statusCode = axiosError.response?.status;
    if (statusCode && HTTP_STATUS_MESSAGES[statusCode]) {
      return HTTP_STATUS_MESSAGES[statusCode];
    }
  }

  // Handle generic error objects with code property
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as any).code;
    if (typeof code === 'number' && ERROR_MESSAGES[code]) {
      return ERROR_MESSAGES[code];
    }
  }

  // Return default message
  return defaultMessage;
}

/**
 * Type guard to check if error is AxiosError
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as any).isAxiosError === true
  );
}

/**
 * Get error message with fallback to backend message if no custom mapping exists
 * This allows you to use custom messages when available, but fallback to backend messages
 * 
 * @param error - Axios error or any error object
 * @param defaultMessage - Default message to use if no mapping found
 * @param useBackendMessage - Whether to use backend message as fallback (default: false)
 * @returns Error message string
 */
export function getErrorMessageWithFallback(
  error: unknown,
  defaultMessage: string = DEFAULT_ERROR_MESSAGES.GENERIC,
  useBackendMessage: boolean = false
): string {
  // Try to get custom message first
  const customMessage = getErrorMessage(error, '');

  if (customMessage && customMessage !== defaultMessage) {
    return customMessage;
  }

  // If useBackendMessage is true, try to get backend message
  if (useBackendMessage && isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const backendMessage =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error?.message;

    if (backendMessage) {
      return backendMessage;
    }
  }

  // Return default message
  return defaultMessage;
}

