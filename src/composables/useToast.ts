import { ref, type Ref } from 'vue';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

export interface UseToastReturn {
  toasts: Ref<ToastMessage[]>;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  removeToast: (id: number) => void;
}

const DEFAULT_TOAST_DURATION = 2000;

const toasts = ref<ToastMessage[]>([]);
const timeoutIds = new Map<number, ReturnType<typeof setTimeout>>();
let toastId = 0;

const removeToast = (id: number): void => {
  const index = toasts.value.findIndex((t) => t.id === id);
  if (index === -1) {
    return;
  }

  const timeoutId = timeoutIds.get(id);
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutIds.delete(id);
  }
  toasts.value.splice(index, 1);
};

const clearAllToasts = (): void => {
  timeoutIds.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });
  timeoutIds.clear();
  toasts.value = [];
};

const showToast = (
  message: string,
  type: ToastType = 'success',
  duration: number = DEFAULT_TOAST_DURATION
): void => {
  if (!message.trim()) {
    return;
  }

  clearAllToasts();

  const id = toastId++;
  const toast: ToastMessage = {
    id,
    message: message.trim(),
    type,
    duration,
  };

  toasts.value.push(toast);

  const timeoutId = setTimeout(() => {
    removeToast(id);
  }, duration);

  timeoutIds.set(id, timeoutId);
};

export const useToast = (): UseToastReturn => {
  const success = (message: string, duration: number = DEFAULT_TOAST_DURATION): void => {
    showToast(message, 'success', duration);
  };

  const error = (message: string, duration: number = DEFAULT_TOAST_DURATION): void => {
    showToast(message, 'error', duration);
  };

  return {
    toasts,
    success,
    error,
    removeToast,
  };
};
