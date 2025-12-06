/**
 * Retry utility for API calls with exponential backoff
 * Implements retry logic for transient failures as per User Rules
 */

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryCondition?: (error: unknown) => boolean;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffMultiplier: 2,
  retryCondition: (error: unknown) => {
    // Retry on network errors or 5xx server errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status) {
        const status = axiosError.response.status;
        return status >= 500 && status < 600; // Server errors
      }
    }
    // Network error (no response)
    return true;
  },
};

/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param options Retry options
 * @returns Promise that resolves with the function result
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: unknown;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      lastError = error;

      // Don't retry if condition is not met
      if (!opts.retryCondition(error)) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === opts.maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        opts.initialDelay * Math.pow(opts.backoffMultiplier, attempt),
        opts.maxDelay
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

