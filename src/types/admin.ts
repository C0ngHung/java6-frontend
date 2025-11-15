export interface StatCard {
  id: number;
  label: string;
  value: string;
  change: string;
  icon: string;
  iconColor: string;
}

export interface Order {
  id: number;
  customer: string;
  date: string;
  status: 'Shipped' | 'Processing' | 'Canceled' | 'Pending';
  total: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  description?: string;
  category?: string;
}

export interface Category {
  id: number;
  name: string;
  icon?: string;
  hasChildren?: boolean;
}

