interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryCondition?: (error: unknown) => boolean;
}

interface ErrorWithResponse {
  response?: {
    status?: number;
  };
}

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_INITIAL_DELAY_MS = 1000;
const DEFAULT_MAX_DELAY_MS = 10000;
const DEFAULT_BACKOFF_MULTIPLIER = 2;
const HTTP_STATUS_SERVER_ERROR_START = 500;
const HTTP_STATUS_SERVER_ERROR_END = 600;

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: DEFAULT_MAX_RETRIES,
  initialDelay: DEFAULT_INITIAL_DELAY_MS,
  maxDelay: DEFAULT_MAX_DELAY_MS,
  backoffMultiplier: DEFAULT_BACKOFF_MULTIPLIER,
  retryCondition: (error: unknown): boolean => {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as ErrorWithResponse;
      const status = axiosError.response?.status;
      if (status !== undefined) {
        return status >= HTTP_STATUS_SERVER_ERROR_START && status < HTTP_STATUS_SERVER_ERROR_END;
      }
    }
    return true;
  },
};

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

      if (!opts.retryCondition(error)) {
        throw error;
      }

      if (attempt === opts.maxRetries) {
        break;
      }

      const delay = Math.min(
        opts.initialDelay * Math.pow(opts.backoffMultiplier, attempt),
        opts.maxDelay
      );

      await new Promise<void>((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

