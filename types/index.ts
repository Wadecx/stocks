export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  password?: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface OrderProduct {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  clientId: number;
  products: OrderProduct[];
  status: 'en cours' | 'livrée';
  total: number;
  date: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}
