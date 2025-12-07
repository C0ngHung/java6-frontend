import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse, PaginationRequest, PaginationResponse } from '@/types/api';
import type { OrderRequestDto, OrderResponseDto, OrderUpdateRequestDto } from '@/types/order';
import { retry } from '@/utils/retry';

const REQUEST_TIMEOUT_MS = 30000;
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 20;

interface OrderListParams extends PaginationRequest {
  sort?: string;
  direction?: string;
  [key: string]: unknown;
}

export const orderApi = {
  create: async (data: OrderRequestDto): Promise<ApiResponse<OrderResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<OrderResponseDto>>(
        API_ENDPOINTS.ORDER.BASE,
        data,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  getById: async (orderId: number): Promise<ApiResponse<OrderResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<OrderResponseDto>>(
        `${API_ENDPOINTS.ORDER.BASE}/${orderId}`,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  getUserOrders: async (page: number = DEFAULT_PAGE, size: number = DEFAULT_PAGE_SIZE): Promise<ApiResponse<PaginationResponse<OrderResponseDto>>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<PaginationResponse<OrderResponseDto>>>(
        API_ENDPOINTS.ORDER.BASE,
        {
          params: { page, size },
          timeout: REQUEST_TIMEOUT_MS,
        }
      );
      return response.data;
    });
  },

  getAll: async (params?: OrderListParams): Promise<ApiResponse<PaginationResponse<OrderResponseDto>>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<PaginationResponse<OrderResponseDto>>>(
        API_ENDPOINTS.ORDER.ADMIN,
        {
          params,
          timeout: REQUEST_TIMEOUT_MS,
        }
      );
      return response.data;
    });
  },

  update: async (orderId: number, data: OrderUpdateRequestDto): Promise<ApiResponse<OrderResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<OrderResponseDto>>(
        `${API_ENDPOINTS.ORDER.BASE}/${orderId}`,
        data,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  delete: async (orderId: number): Promise<ApiResponse<void>> => {
    return retry(async () => {
      const response = await axiosInstance.delete<ApiResponse<void>>(
        `${API_ENDPOINTS.ORDER.BASE}/${orderId}`,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },
};

