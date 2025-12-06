export interface ProductImageResponseDto {
  id: number;
  url: string;
  isMain: boolean;
  position: number;
}

export interface ProductResponseDto {
  id: number;
  sku: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl?: string;
  priceCents: number;
  currencyCode: string;
  categoryId?: number;
  categoryName?: string;
  isActive: boolean;
  quantity?: number;
  safetyStock?: number;
}

export interface ProductCreateDto {
  sku: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl?: string;
  priceCents: number;
  currencyCode?: string;
  categoryId?: number;
  isActive?: boolean;
  quantity?: number;
  safetyStock?: number;
}

export interface ProductUpdateDto extends Partial<ProductCreateDto> {}
