export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  code?: number;
  data: T;
  timestamp?: string;
}

export type SortDirection = 'ASC' | 'DESC';

export interface PaginationRequest {
  page: number;
  size: number;
  sort?: string;
  direction?: SortDirection;
}

export interface PaginationResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
