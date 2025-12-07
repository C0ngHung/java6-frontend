import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse } from '@/types/api';
import type { CartItemRequestDto, CartResponseDto } from '@/types/cart';
import { retry } from '@/utils/retry';

const CART_ITEMS_PATH = '/items';
const CART_CLEAR_PATH = '/clear';
const CART_MERGE_PATH = '/merge';

export const cartApi = {
  getCart: async (userId?: number, anonymousId?: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<CartResponseDto>>(
        API_ENDPOINTS.CART.BASE,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  getOrCreate: async (userId?: number, anonymousId?: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<CartResponseDto>>(
        API_ENDPOINTS.CART.BASE,
        null,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  addItem: async (data: CartItemRequestDto, userId?: number, anonymousId?: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<CartResponseDto>>(
        `${API_ENDPOINTS.CART.BASE}${CART_ITEMS_PATH}`,
        data,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  updateItem: async (itemId: number, data: CartItemRequestDto, userId?: number, anonymousId?: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<CartResponseDto>>(
        `${API_ENDPOINTS.CART.BASE}${CART_ITEMS_PATH}/${itemId}`,
        data,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  removeItem: async (itemId: number, userId?: number, anonymousId?: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.delete<ApiResponse<CartResponseDto>>(
        `${API_ENDPOINTS.CART.BASE}${CART_ITEMS_PATH}/${itemId}`,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  clear: async (userId?: number, anonymousId?: string): Promise<ApiResponse<void>> => {
    return retry(async () => {
      const response = await axiosInstance.delete<ApiResponse<void>>(
        `${API_ENDPOINTS.CART.BASE}${CART_CLEAR_PATH}`,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  merge: async (userId: number, anonymousId: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<CartResponseDto>>(
        `${API_ENDPOINTS.CART.BASE}${CART_MERGE_PATH}`,
        null,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },
};
