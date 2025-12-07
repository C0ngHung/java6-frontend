export interface RoleResponseDto {
  id: number;
  code: string;
  name: string;
  description?: string;
}

export interface RoleRequestDto {
  code: string;
  name: string;
  description?: string;
}

