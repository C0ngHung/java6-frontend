export interface CategoryResponseDto {
  id: number;
  slug: string;
  name: string;
}

export interface CategoryCreateDto {
  slug: string;
  name: string;
}

export interface CategoryUpdateDto extends CategoryCreateDto {}
