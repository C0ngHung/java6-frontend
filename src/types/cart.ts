export interface CartItemResponseDto {
  id: number;
  productId: number;
  productName: string;
  productSlug?: string;
  productImageUrl?: string;
  unitPriceCents: number;
  currencyCode?: string;
  quantity: number;
  subtotalCents: number;
}

export interface CartResponseDto {
  id: number;
  userId?: number;
  anonymousId?: string;
  statusCart: string;
  items: CartItemResponseDto[];
  totalItems: number;
  totalPriceCents: number;
}

export interface CartItemRequestDto {
  productId: number;
  quantity: number;
}
