import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse, PaginationRequest, PaginationResponse } from '@/types/api';
import type { RoleResponseDto, RoleRequestDto } from '@/types/role';
import { retry } from '@/utils/retry';

const REQUEST_TIMEOUT_MS = 30000;

interface RoleSearchParams extends PaginationRequest {
  sort?: string;
  direction?: 'ASC' | 'DESC';
  code?: string;
  name?: string;
  description?: string;
}

export const roleApi = {
  getAll: async (params: RoleSearchParams): Promise<ApiResponse<PaginationResponse<RoleResponseDto>>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<PaginationResponse<RoleResponseDto>>>(
        API_ENDPOINTS.ROLE.SEARCH,
        { params, timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  getById: async (id: number): Promise<ApiResponse<RoleResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<RoleResponseDto>>(
        `${API_ENDPOINTS.ROLE.BASE}/${id}`,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  create: async (data: RoleRequestDto): Promise<ApiResponse<RoleResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<RoleResponseDto>>(
        API_ENDPOINTS.ROLE.BASE,
        data,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  update: async (id: number, data: RoleRequestDto): Promise<ApiResponse<RoleResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<RoleResponseDto>>(
        `${API_ENDPOINTS.ROLE.BASE}/${id}`,
        data,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return retry(async () => {
      const response = await axiosInstance.delete<ApiResponse<void>>(
        `${API_ENDPOINTS.ROLE.BASE}/${id}`,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },
};

