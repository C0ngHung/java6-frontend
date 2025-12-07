import { defineStore } from 'pinia';
import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { cartApi } from '@/services/cart';
import { useAuthStore } from './auth';
import type { CartResponseDto, CartItemRequestDto } from '@/types/cart';
import { useToast } from '@/composables/useToast';
import { getErrorMessage, DEFAULT_ERROR_MESSAGES } from '@/utils/getErrorMessage';

const STORAGE_ANONYMOUS_ID_KEY = 'anonymousId';
const ANONYMOUS_ID_PREFIX = 'anon_';
const ANONYMOUS_ID_RANDOM_LENGTH = 9;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_CONFLICT = 409;
const ERROR_CODE_DUPLICATE_ITEM = 4003;
const DEFAULT_QUANTITY = 1;
const UNUSED_PRODUCT_ID = 0;

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore();
  const toast = useToast();

  const cart: Ref<CartResponseDto | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const anonymousId: Ref<string | null> = ref(localStorage.getItem(STORAGE_ANONYMOUS_ID_KEY));

  const getAnonymousId = (): string => {
    if (anonymousId.value) {
      return anonymousId.value;
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 2 + ANONYMOUS_ID_RANDOM_LENGTH);
    const newId = `${ANONYMOUS_ID_PREFIX}${timestamp}_${random}`;
    anonymousId.value = newId;
    localStorage.setItem(STORAGE_ANONYMOUS_ID_KEY, newId);
    return newId;
  };

  const getCartIdentifiers = (): { userId?: number; anonId?: string } => {
    const userId = authStore.isAuthenticated && authStore.user?.id ? authStore.user.id : undefined;
    const anonId = !authStore.isAuthenticated ? getAnonymousId() : undefined;
    return { userId, anonId };
  };

  const cartCount: ComputedRef<number> = computed(() => {
    return cart.value?.totalItems || 0;
  });

  const totalPrice: ComputedRef<number> = computed(() => {
    return cart.value?.totalPriceCents || 0;
  });

  const fetchCart = async (): Promise<void> => {
    loading.value = true;
    try {
      const { userId, anonId } = getCartIdentifiers();
      const response = await cartApi.getCart(userId, anonId);
      if (response.success) {
        cart.value = response.data;
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status !== HTTP_STATUS_NOT_FOUND) {
        // Other errors are logged by axios interceptor if needed
      }
    } finally {
      loading.value = false;
    }
  };

  const getOrCreateCart = async (): Promise<CartResponseDto> => {
    loading.value = true;
    try {
      const { userId, anonId } = getCartIdentifiers();
      const response = await cartApi.getOrCreate(userId, anonId);
      if (response.success && response.data) {
        cart.value = response.data;
        return response.data;
      }
      throw new Error('Failed to get or create cart');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_GET));
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const addItem = async (productId: number, quantity: number = DEFAULT_QUANTITY): Promise<CartResponseDto> => {
    loading.value = true;
    try {
      const { userId, anonId } = getCartIdentifiers();

      const itemData: CartItemRequestDto = {
        productId,
        quantity,
      };

      const response = await cartApi.addItem(itemData, userId, anonId);
      if (response.success && response.data) {
        cart.value = response.data;
        toast.success('Product added to cart!');
        return response.data;
      }
      throw new Error('Failed to add item to cart');
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number; data?: { code?: number } } };
      if (axiosError.response?.status === HTTP_STATUS_CONFLICT || axiosError.response?.data?.code === ERROR_CODE_DUPLICATE_ITEM) {
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

  const updateItem = async (itemId: number, quantity: number): Promise<CartResponseDto> => {
    loading.value = true;
    try {
      const { userId, anonId } = getCartIdentifiers();

      const itemData: CartItemRequestDto = {
        productId: UNUSED_PRODUCT_ID,
        quantity,
      };

      const response = await cartApi.updateItem(itemId, itemData, userId, anonId);
      if (response.success && response.data) {
        cart.value = response.data;
        return response.data;
      }
      throw new Error('Failed to update cart item');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_UPDATE));
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const removeItem = async (itemId: number): Promise<CartResponseDto> => {
    loading.value = true;
    try {
      const { userId, anonId } = getCartIdentifiers();

      const response = await cartApi.removeItem(itemId, userId, anonId);
      if (response.success && response.data) {
        cart.value = response.data;
        toast.success('Product removed from cart');
        return response.data;
      }
      throw new Error('Failed to remove cart item');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_REMOVE));
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const clearCart = async (): Promise<void> => {
    loading.value = true;
    try {
      const { userId, anonId } = getCartIdentifiers();

      const response = await cartApi.clear(userId, anonId);
      if (response.success) {
        cart.value = null;
        toast.success('Cart cleared');
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, DEFAULT_ERROR_MESSAGES.CART_CLEAR));
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const mergeCartOnLogin = async (userId: number): Promise<void> => {
    const anonId = anonymousId.value;
    if (!anonId) {
      await fetchCart();
      return;
    }

    try {
      const response = await cartApi.merge(userId, anonId);
      if (response.success && response.data) {
        cart.value = response.data;
      }

      anonymousId.value = null;
      localStorage.removeItem(STORAGE_ANONYMOUS_ID_KEY);
    } catch {
      await fetchCart();
    }
  };

  const initCart = async (): Promise<void> => {
    if (authStore.isAuthenticated && authStore.user?.id) {
      await fetchCart();
    }
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

