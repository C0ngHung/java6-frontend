import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { cartApi } from '@/services/cart';
import { useAuthStore } from './auth';
import type { CartResponseDto, CartItemRequestDto } from '@/types/cart';
import { useToast } from '@/composables/useToast';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore();
  const toast = useToast();

  const cart = ref<CartResponseDto | null>(null);
  const loading = ref(false);
  const anonymousId = ref<string | null>(localStorage.getItem('anonymousId'));

  // Generate or get anonymous ID for guest users
  const getAnonymousId = (): string => {
    if (!anonymousId.value) {
      const newId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      anonymousId.value = newId;
      localStorage.setItem('anonymousId', newId);
    }
    return anonymousId.value;
  };

  // Computed properties
  const cartCount = computed(() => {
    return cart.value?.totalItems || 0;
  });

  const totalPrice = computed(() => {
    return cart.value?.totalPriceCents || 0;
  });

  // Fetch cart from API
  const fetchCart = async () => {
    loading.value = true;
    try {
      // If user is authenticated, use userId (never use anonymousId)
      // If user is not authenticated, use anonymousId (never use userId)
      const userId = authStore.isAuthenticated && authStore.user?.id ? authStore.user.id : undefined;
      const anonId = !authStore.isAuthenticated ? getAnonymousId() : undefined;

      const response = await cartApi.getCart(userId, anonId);
      if (response.success) {
        cart.value = response.data;
      }
    } catch (error: any) {
      // 404 is normal when cart doesn't exist yet - don't log it
      // Only log other errors (network errors, 500, etc.)
      if (error.response?.status !== 404) {
        // Other errors are logged by axios interceptor if needed
      }
      // Silently fail - cart will remain null
    } finally {
      loading.value = false;
    }
  };

  // Get or create cart
  const getOrCreateCart = async () => {
    loading.value = true;
    try {
      // If user is authenticated, use userId (never use anonymousId)
      // If user is not authenticated, use anonymousId (never use userId)
      const userId = authStore.isAuthenticated && authStore.user?.id ? authStore.user.id : undefined;
      const anonId = !authStore.isAuthenticated ? getAnonymousId() : undefined;

      const response = await cartApi.getOrCreate(userId, anonId);
      if (response.success) {
        cart.value = response.data;
        return response.data;
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_GET));
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Add item to cart
  const addItem = async (productId: number, quantity: number = 1) => {
    loading.value = true;
    try {
      // Backend handles cart creation automatically - no need to call getOrCreateCart() first
      // This prevents race conditions and duplicate entries

      // If user is authenticated, use userId (never use anonymousId)
      // If user is not authenticated, use anonymousId (never use userId)
      const userId = authStore.isAuthenticated && authStore.user?.id ? authStore.user.id : undefined;
      const anonId = !authStore.isAuthenticated ? getAnonymousId() : undefined;

      const itemData: CartItemRequestDto = {
        productId,
        quantity,
      };

      // Backend will automatically getOrCreateCart if needed
      const response = await cartApi.addItem(itemData, userId, anonId);
      if (response.success) {
        cart.value = response.data;
        toast.success('Product added to cart!');
        return response.data;
      }
    } catch (error: any) {
      // Handle duplicate entry error gracefully
      if (error.response?.status === 409 || error.response?.data?.code === 4003) {
        // Cart item already exists - refresh cart to get updated state
        await fetchCart();
        toast.error('Sản phẩm đã có trong giỏ hàng');
      } else {
        toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_ADD));
      }
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Update item quantity
  const updateItem = async (itemId: number, quantity: number) => {
    loading.value = true;
    try {
      // If user is authenticated, use userId (never use anonymousId)
      // If user is not authenticated, use anonymousId (never use userId)
      const userId = authStore.isAuthenticated && authStore.user?.id ? authStore.user.id : undefined;
      const anonId = !authStore.isAuthenticated ? getAnonymousId() : undefined;

      const itemData: CartItemRequestDto = {
        productId: 0, // Not used in update
        quantity,
      };

      const response = await cartApi.updateItem(itemId, itemData, userId, anonId);
      if (response.success) {
        cart.value = response.data;
        return response.data;
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_UPDATE));
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Remove item from cart
  const removeItem = async (itemId: number) => {
    loading.value = true;
    try {
      // If user is authenticated, use userId (never use anonymousId)
      // If user is not authenticated, use anonymousId (never use userId)
      const userId = authStore.isAuthenticated && authStore.user?.id ? authStore.user.id : undefined;
      const anonId = !authStore.isAuthenticated ? getAnonymousId() : undefined;

      const response = await cartApi.removeItem(itemId, userId, anonId);
      if (response.success) {
        cart.value = response.data;
        toast.success('Product removed from cart');
        return response.data;
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_REMOVE));
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Clear cart
  const clearCart = async () => {
    loading.value = true;
    try {
      // If user is authenticated, use userId (never use anonymousId)
      // If user is not authenticated, use anonymousId (never use userId)
      const userId = authStore.isAuthenticated && authStore.user?.id ? authStore.user.id : undefined;
      const anonId = !authStore.isAuthenticated ? getAnonymousId() : undefined;

      const response = await cartApi.clear(userId, anonId);
      if (response.success) {
        cart.value = null;
        toast.success('Cart cleared');
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_CLEAR));
      throw error;
    } finally {
      loading.value = false;
    }
  };

  // Merge guest cart into user cart when user logs in
  const mergeCartOnLogin = async (userId: number) => {
    try {
      const anonId = anonymousId.value;

      // If there's no anonymous cart, just fetch user cart
      if (!anonId) {
        await fetchCart();
        return;
      }

      // Use backend merge endpoint for better performance
      const response = await cartApi.merge(userId, anonId);
      if (response.success) {
        cart.value = response.data;
      }

      // Clear anonymous ID
      anonymousId.value = null;
      localStorage.removeItem('anonymousId');
    } catch (error: any) {
      // Silently fail - just fetch user cart
      // Error is logged by axios interceptor if needed
      await fetchCart();
    }
  };

  // Initialize cart on store creation
  const initCart = async () => {
    // Only fetch cart if user is authenticated (they might have an existing cart)
    // For anonymous users, don't fetch on init - cart will be created automatically when they add first item
    if (authStore.isAuthenticated && authStore.user?.id) {
      await fetchCart();
    }
    // Anonymous users: cart will be created via getOrCreateCart() when they add first item
  };

  return {
    cart,
    loading,
    cartCount,
    totalPrice,
    anonymousId,
    fetchCart,
    getOrCreateCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    mergeCartOnLogin,
    initCart,
  };
});

