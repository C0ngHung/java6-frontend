import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/constants';
import type { ApiResponse } from '@/types/api';
import type { UserResponse, UserUpdateRequest } from '@/types/user';
import { retry } from '@/utils/retry';

/**
 * User API service
 * Handles all user-related API calls
 */
export const userApi = {
  /**
   * Get current user profile
   * @param userId - User ID
   * @returns Promise with user response
   */
  getProfile: async (userId: number): Promise<ApiResponse<UserResponse>> => {
    return retry(async () => {
      const response = await axiosInstance.get<ApiResponse<UserResponse>>(
        `${API_ENDPOINTS.USER.BASE}/${userId}`,
        {
          timeout: 30000,
        }
      );
      return response.data;
    });
  },

  /**
   * Update user profile
   * @param userId - User ID
   * @param data - User update data (fullName, email, phone, password)
   * @returns Promise with updated user response
   */
  updateProfile: async (userId: number, data: UserUpdateRequest): Promise<ApiResponse<UserResponse>> => {
    return retry(async () => {
      const response = await axiosInstance.put<ApiResponse<UserResponse>>(
        `${API_ENDPOINTS.USER.BASE}/${userId}`,
        data,
        {
          timeout: 30000,
        }
      );
      return response.data;
    });
  },
};

