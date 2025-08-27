// @/types/api.ts

// Enums
export type PaymentMethod = "cash" | "telebirr" | "bank_transfer";

// Core entities
export interface Waiter {
  id: number;
  name: string;
  serves_coffee: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  waiter_id: number;
  menu_item_id: number;
  quantity: number;
  total_price: number;
  payment_method: PaymentMethod;
  created_at: string;
}

export interface DailyReconciliation {
  id: number;
  waiter_id: number;
  date: string;
  total_cash_expected: number;
  total_cash_collected: number;
  absent: number;
  rolled_over: number;
}

// Generic API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
