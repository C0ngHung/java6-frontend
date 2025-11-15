import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { authApi } from '@/api/auth';
import type { RegisterRequest } from '@/types/user';

export const useAuth = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const user = computed(() => authStore.user);

  const login = async (username: string, password: string) => {
    await authStore.login(username, password);
  };

  const logout = async () => {
    await authStore.logout();
    router.push({ name: 'Login' });
  };

  const register = async (data: RegisterRequest) => {
    return await authApi.register(data);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    register,
  };
};

