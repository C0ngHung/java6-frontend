import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/user';
import { authApi } from '@/services/api/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'));
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'));

  const isAuthenticated = computed(() => {
    return !!accessToken.value && !!user.value;
  });

  const setUser = (userData: User | null) => {
    user.value = userData;
  };

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  };

  const clearAuth = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
      console.error('Logout error:', error);
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
      localStorage.setItem('accessToken', access);
      
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

