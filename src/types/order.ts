export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderRequestDto {
  cartId: number;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  paymentMethod?: string;
  notes?: string;
}

export interface OrderUpdateRequestDto {
  status?: OrderStatus;
  shippingName?: string;
  shippingPhone?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  paymentStatus?: PaymentStatus;
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
  status: OrderStatus;
  totalAmountCents: number;
  currencyCode: string;
  shippingAddress: string;
  shippingPhone: string;
  shippingName: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  notes?: string;
  items: OrderItemResponseDto[];
  createdAt: string;
  updatedAt: string;
}

