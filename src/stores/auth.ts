import { defineStore } from 'pinia';
import { ref, computed, type Ref, type ComputedRef } from 'vue';
import type { User } from '@/types/user';
import { authApi } from '@/services/auth';
import { STORAGE_KEYS } from '@/constants';

const STORAGE_USER_KEY = 'user';
const DEFAULT_ROLE = 'USER';
const ADMIN_ROLE = 'ADMIN';
const ROLE_ADMIN = 'ROLE_ADMIN';

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null);
  const accessToken: Ref<string | null> = ref(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN));
  const refreshToken: Ref<string | null> = ref(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN));

  const isAuthenticated: ComputedRef<boolean> = computed(() => {
    return !!accessToken.value && !!user.value;
  });

  const isAdmin: ComputedRef<boolean> = computed(() => {
    if (!user.value?.role) {
      return false;
    }

    const role = user.value.role.toUpperCase();
    return role === ADMIN_ROLE || role === ROLE_ADMIN || role.includes(ADMIN_ROLE);
  });

  const setUser = (userData: User | null): void => {
    user.value = userData;
  };

  const setTokens = (access: string, refresh: string): void => {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
  };

  const clearAuth = (): void => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_USER_KEY);
  };

  const login = async (username: string, password: string): Promise<ReturnType<typeof authApi.login>> => {
    const response = await authApi.login(username, password);
    const { accessToken: access, refreshToken: refresh, userId, email, fullName, phone, roles, permissions } = response.data;

    const userData: User = {
      id: userId,
      username,
      email,
      fullName,
      phone,
      isActive: true,
      role: roles[0] || DEFAULT_ROLE,
      authorities: permissions,
    };

    setUser(userData);
    setTokens(access, refresh);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));

    const { useCartStore } = await import('./cart');
    const cartStore = useCartStore();
    if (cartStore.anonymousId) {
      await cartStore.mergeCartOnLogin(userId);
    } else {
      await cartStore.fetchCart();
    }

    return response;
  };

  const initAuth = (): void => {
    const storedUser = localStorage.getItem(STORAGE_USER_KEY);
    if (!storedUser || !accessToken.value) {
      return;
    }

    try {
      user.value = JSON.parse(storedUser);
    } catch {
      clearAuth();
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (accessToken.value) {
        await authApi.logout(accessToken.value);
      }
    } catch {
      // Silently fail - logout should always succeed
    } finally {
      try {
        const { useCartStore } = await import('./cart');
        const cartStore = useCartStore();
        cartStore.cart = null;
      } catch {
        // Silently fail - cart state clearing is not critical
      }
      clearAuth();
    }
  };

  const refreshAccessToken = async (): Promise<string> => {
    if (!refreshToken.value) {
      clearAuth();
      throw new Error('No refresh token available');
    }

    try {
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
    isAdmin,
    setUser,
    setTokens,
    clearAuth,
    login,
    logout,
    refreshAccessToken,
    initAuth,
  };
});

