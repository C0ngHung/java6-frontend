import { ref } from 'vue';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
  duration: number;
}

const toasts = ref<ToastMessage[]>([]);
const timeoutIds = new Map<number, ReturnType<typeof setTimeout>>();
let toastId = 0;

export const useToast = () => {
  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      // Clear timeout if exists
      const timeoutId = timeoutIds.get(id);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutIds.delete(id);
      }
      toasts.value.splice(index, 1);
    }
  };

  const clearAllToasts = () => {
    // Clear all timeouts
    timeoutIds.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    timeoutIds.clear();
    // Remove all toasts
    toasts.value = [];
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success', duration = 2000) => {
    // Remove all existing toasts immediately when a new toast appears
    clearAllToasts();

    const id = toastId++;
    const toast: ToastMessage = {
      id,
      message,
      type,
      duration,
    };

    toasts.value.push(toast);

    // Auto remove after duration
    const timeoutId = setTimeout(() => {
      removeToast(id);
    }, duration);
    
    timeoutIds.set(id, timeoutId);
  };

  const success = (message: string, duration = 2000) => {
    showToast(message, 'success', duration);
  };

  const error = (message: string, duration = 2000) => {
    showToast(message, 'error', duration);
  };

  return {
    toasts,
    success,
    error,
    removeToast,
  };
};
