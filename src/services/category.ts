import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse, PaginationRequest, PaginationResponse } from '@/types/api';
import type { CategoryCreateDto, CategoryResponseDto, CategoryUpdateDto } from '@/types/category';

export const categoryApi = {
  getAll: async (params: PaginationRequest & { sort?: string; direction?: 'ASC' | 'DESC'; search?: string }): Promise<ApiResponse<PaginationResponse<CategoryResponseDto>>> => {
    const response = await axiosInstance.get<ApiResponse<PaginationResponse<CategoryResponseDto>>>(
      API_ENDPOINTS.CATEGORY.BASE,
      { params }
    );
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<CategoryResponseDto>> => {
    const response = await axiosInstance.get<ApiResponse<CategoryResponseDto>>(
      `${API_ENDPOINTS.CATEGORY.BASE}/${id}`
    );
    return response.data;
  },

  create: async (data: CategoryCreateDto): Promise<ApiResponse<CategoryResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<CategoryResponseDto>>(
      API_ENDPOINTS.CATEGORY.BASE,
      data
    );
    return response.data;
  },

  update: async (id: number, data: CategoryUpdateDto): Promise<ApiResponse<CategoryResponseDto>> => {
    const response = await axiosInstance.put<ApiResponse<CategoryResponseDto>>(
      `${API_ENDPOINTS.CATEGORY.BASE}/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.delete<ApiResponse<void>>(
      `${API_ENDPOINTS.CATEGORY.BASE}/${id}`
    );
    return response.data;
  },
};
