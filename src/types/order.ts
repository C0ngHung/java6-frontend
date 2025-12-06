export interface OrderRequestDto {
  cartId: number;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  paymentMethod?: string;
  notes?: string;
}

export interface OrderItemResponseDto {
  id: number;
  productId: number;
  productName: string;
  productImageUrl?: string;
  unitPriceCents: number;
  currencyCode: string;
  quantity: number;
  subtotalCents: number;
}

export interface OrderResponseDto {
  id: number;
  orderNumber: string;
  userId: number;
  status: string;
  totalAmountCents: number;
  currencyCode: string;
  shippingAddress: string;
  shippingPhone: string;
  shippingName: string;
  paymentMethod: string;
  paymentStatus: string;
  notes?: string;
  items: OrderItemResponseDto[];
  createdAt: string;
  updatedAt: string;
}

