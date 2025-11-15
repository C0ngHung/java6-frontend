import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/user';
import { authApi } from '@/api/auth';
import { STORAGE_KEYS } from '@/constants';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN));
  const refreshToken = ref<string | null>(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN));

  const isAuthenticated = computed(() => {
    return !!accessToken.value && !!user.value;
  });

  const setUser = (userData: User | null) => {
    user.value = userData;
  };

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
  };

  const clearAuth = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await authApi.login(username, password);
      const { accessToken: access, refreshToken: refresh, userId, authorities } = response.data;

      // Create user object from response
      const userData: User = {
        id: userId,
        username: username,
        email: '',
        fullName: '',
        phone: '',
        isActive: true,
        authorities: Array.isArray(authorities) ? authorities : [],
      };

      setUser(userData);
      setTokens(access, refresh);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (accessToken.value) {
        await authApi.logout(accessToken.value);
      }
    } catch (error) {
      // Logout error - silently fail
    } finally {
      clearAuth();
    }
  };

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken.value) {
        throw new Error('No refresh token available');
      }

      const response = await authApi.refreshToken(refreshToken.value);
      const { accessToken: access } = response.data;

      accessToken.value = access;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);

      return access;
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    setUser,
    setTokens,
    clearAuth,
    login,
    logout,
    refreshAccessToken,
  };
});

