import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse, PaginationRequest, PaginationResponse } from '@/types/api';
import type { ProductCreateDto, ProductResponseDto, ProductUpdateDto } from '@/types/product';

interface ProductSearchParams extends PaginationRequest {
  sort?: string;
  direction?: 'ASC' | 'DESC';
  search?: string;
  categoryId?: number;
}

export const productApi = {
  getAll: async (params: ProductSearchParams): Promise<ApiResponse<PaginationResponse<ProductResponseDto>>> => {
    const response = await axiosInstance.get<ApiResponse<PaginationResponse<ProductResponseDto>>>(
      API_ENDPOINTS.PRODUCT.BASE,
      { params }
    );
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<ProductResponseDto>> => {
    const response = await axiosInstance.get<ApiResponse<ProductResponseDto>>(
      `${API_ENDPOINTS.PRODUCT.BASE}/${id}`
    );
    return response.data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<ProductResponseDto>> => {
    const SLUG_SEARCH_PAGE = 1;
    const SLUG_SEARCH_SIZE = 10;

    const response = await axiosInstance.get<ApiResponse<PaginationResponse<ProductResponseDto>>>(
      API_ENDPOINTS.PRODUCT.BASE,
      {
        params: {
          page: SLUG_SEARCH_PAGE,
          size: SLUG_SEARCH_SIZE,
          slug,
        },
      }
    );

    if (response.data.success && response.data.data?.content && response.data.data.content.length > 0) {
      const exactMatch = response.data.data.content.find((p) => p.slug === slug);

      if (exactMatch) {
        return {
          success: true,
          data: exactMatch,
          message: response.data.message,
          timestamp: response.data.timestamp,
        };
      }
    }

    return {
      success: false,
      data: null as unknown as ProductResponseDto,
      message: 'Product not found',
      timestamp: new Date().toISOString(),
    };
  },

  create: async (data: ProductCreateDto): Promise<ApiResponse<ProductResponseDto>> => {
    const response = await axiosInstance.post<ApiResponse<ProductResponseDto>>(
      API_ENDPOINTS.PRODUCT.BASE,
      data
    );
    return response.data;
  },

  update: async (id: number, data: ProductUpdateDto): Promise<ApiResponse<ProductResponseDto>> => {
    const response = await axiosInstance.put<ApiResponse<ProductResponseDto>>(
      `${API_ENDPOINTS.PRODUCT.BASE}/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.delete<ApiResponse<void>>(
      `${API_ENDPOINTS.PRODUCT.BASE}/${id}`
    );
    return response.data;
  },
};
