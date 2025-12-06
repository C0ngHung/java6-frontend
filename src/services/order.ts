import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse } from '@/types/api';
import type { OrderRequestDto, OrderResponseDto } from '@/types/order';
import { retry } from '@/utils/retry';

export const orderApi = {
  create: async (data: OrderRequestDto): Promise<ApiResponse<OrderResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<OrderResponseDto>>(
        API_ENDPOINTS.ORDER.BASE,
        data,
        {
          timeout: 30000,
        }
      );
      return response.data;
    });
  },

  getById: async (orderId: number): Promise<ApiResponse<OrderResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<OrderResponseDto>>(
        `${API_ENDPOINTS.ORDER.BASE}/${orderId}`,
        {
          timeout: 30000,
        }
      );
      return response.data;
    });
  },

  getUserOrders: async (page: number = 0, size: number = 20): Promise<ApiResponse<any>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<any>>(
        API_ENDPOINTS.ORDER.BASE,
        {
          params: { page, size },
          timeout: 30000,
        }
      );
      return response.data;
    });
  },
};

