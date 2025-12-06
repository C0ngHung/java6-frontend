import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse } from '@/types/api';
import type { CartItemRequestDto, CartResponseDto } from '@/types/cart';
import { retry } from '@/utils/retry';

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
        `${API_ENDPOINTS.CART.BASE}/items`,
        data,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  updateItem: async (itemId: number, data: CartItemRequestDto, userId?: number, anonymousId?: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<CartResponseDto>>(
        `${API_ENDPOINTS.CART.BASE}/items/${itemId}`,
        data,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  removeItem: async (itemId: number, userId?: number, anonymousId?: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.delete<ApiResponse<CartResponseDto>>(
        `${API_ENDPOINTS.CART.BASE}/items/${itemId}`,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  clear: async (userId?: number, anonymousId?: string): Promise<ApiResponse<void>> => {
    return retry(async () => {
      const response = await axiosInstance.delete<ApiResponse<void>>(
        `${API_ENDPOINTS.CART.BASE}/clear`,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },

  merge: async (userId: number, anonymousId: string): Promise<ApiResponse<CartResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<CartResponseDto>>(
        `${API_ENDPOINTS.CART.BASE}/merge`,
        null,
        { params: { userId, anonymousId } }
      );
      return response.data;
    });
  },
};
