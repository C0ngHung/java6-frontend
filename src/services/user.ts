import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse, PaginationRequest, PaginationResponse } from '@/types/api';
import type { UserResponse, UserUpdateRequest, UserResponseDto, UserCreateDto, UserUpdateDto, UserRoleResponseDto } from '@/types/user';
import { retry } from '@/utils/retry';

const REQUEST_TIMEOUT_MS = 30000;
const PLACEHOLDER_ID = '{id}';
const PLACEHOLDER_ROLE_ID = '{roleId}';

interface UserSearchParams extends PaginationRequest {
  sort?: string;
  direction?: 'ASC' | 'DESC';
}

const buildEndpoint = (template: string, id: number): string => {
  return template.replace(PLACEHOLDER_ID, id.toString());
};

const buildRoleEndpoint = (template: string, userId: number, roleId: number): string => {
  return template.replace(PLACEHOLDER_ID, userId.toString()).replace(PLACEHOLDER_ROLE_ID, roleId.toString());
};

export const userApi = {
  getProfile: async (userId: number): Promise<ApiResponse<UserResponse>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<UserResponse>>(
        `${API_ENDPOINTS.USER.BASE}/${userId}`,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  updateProfile: async (userId: number, data: UserUpdateRequest): Promise<ApiResponse<UserResponse>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<UserResponse>>(
        `${API_ENDPOINTS.USER.BASE}/${userId}`,
        data,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  getAll: async (params: UserSearchParams): Promise<ApiResponse<PaginationResponse<UserResponseDto>>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<PaginationResponse<UserResponseDto>>>(
        API_ENDPOINTS.USER.SEARCH,
        { params, timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  getById: async (id: number): Promise<ApiResponse<UserResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<UserResponseDto>>(
        `${API_ENDPOINTS.USER.BASE}/${id}`,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  create: async (data: UserCreateDto): Promise<ApiResponse<UserResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<UserResponseDto>>(
        API_ENDPOINTS.USER.BASE,
        data,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  update: async (id: number, data: UserUpdateDto): Promise<ApiResponse<UserResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<UserResponseDto>>(
        `${API_ENDPOINTS.USER.BASE}/${id}`,
        data,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return retry(async () => {
      const response = await axiosInstance.delete<ApiResponse<void>>(
        `${API_ENDPOINTS.USER.BASE}/${id}`,
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  activate: async (id: number): Promise<ApiResponse<UserResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<UserResponseDto>>(
        buildEndpoint(API_ENDPOINTS.USER.ACTIVATE, id),
        {},
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  deactivate: async (id: number): Promise<ApiResponse<UserResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<UserResponseDto>>(
        buildEndpoint(API_ENDPOINTS.USER.DEACTIVATE, id),
        {},
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  assignRole: async (userId: number, roleId: number): Promise<ApiResponse<UserRoleResponseDto>> => {
    return retry(async () => {
      const response = await axiosInstance.post<ApiResponse<UserRoleResponseDto>>(
        buildRoleEndpoint(API_ENDPOINTS.USER.ASSIGN_ROLE, userId, roleId),
        {},
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  removeRole: async (userId: number, roleId: number): Promise<ApiResponse<void>> => {
    return retry(async () => {
      const response = await axiosInstance.delete<ApiResponse<void>>(
        buildRoleEndpoint(API_ENDPOINTS.USER.REMOVE_ROLE, userId, roleId),
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },

  getRoles: async (userId: number): Promise<ApiResponse<UserRoleResponseDto[]>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<UserRoleResponseDto[]>>(
        buildEndpoint(API_ENDPOINTS.USER.GET_ROLES, userId),
        { timeout: REQUEST_TIMEOUT_MS }
      );
      return response.data;
    });
  },
};

