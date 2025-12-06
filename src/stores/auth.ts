import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/user';
import { authApi } from '@/services/auth';
import { STORAGE_KEYS } from '@/constants';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN));
  const refreshToken = ref<string | null>(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN));

  const isAuthenticated = computed(() => {
    return !!accessToken.value && !!user.value;
  });

  const isAdmin = computed(() => {
    if (!user.value || !user.value.role) {
      return false;
    }
    // Check if role is ADMIN (case-insensitive)
    const role = user.value.role.toUpperCase();
    return role === 'ADMIN' || role === 'ROLE_ADMIN' || role.includes('ADMIN');
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
    localStorage.removeItem('user');
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await authApi.login(username, password);
      const { accessToken: access, refreshToken: refresh, userId, email, fullName, phone, roles, permissions } = response.data;

      // Map response to User object
      const userData: User = {
        id: userId,
        username: username,
        email: email,
        fullName: fullName,
        phone: phone,
        isActive: true,
        role: roles[0] || 'USER', // Use first role or default to USER
        authorities: permissions,
      };

      setUser(userData);
      setTokens(access, refresh);

      // Persist user to localStorage to survive refresh (simple approach)
      localStorage.setItem('user', JSON.stringify(userData));

      // Merge guest cart into user cart after login
      const { useCartStore } = await import('./cart');
      const cartStore = useCartStore();
      if (cartStore.anonymousId) {
        await cartStore.mergeCartOnLogin(userId);
      } else {
        // Just fetch user cart if no guest cart exists
        await cartStore.fetchCart();
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const initAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && accessToken.value) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (e) {
        clearAuth();
      }
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
      // Clear cart UI state only (cart remains in database for user to continue shopping when logging back in)
      // This follows best practices from major e-commerce platforms (Shopee, Amazon, etc.)
      try {
        const { useCartStore } = await import('./cart');
        const cartStore = useCartStore();
        // Only clear frontend state - cart persists in database
        cartStore.cart = null;
        // Keep anonymousId in case user wants to continue as guest
      } catch (error) {
        // Silently fail - cart state clearing is not critical
      }
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

