// @/types/api.ts

import { FullEntity } from "@/types/base";

// Enums
export type PaymentMethod = "cash" | "telebirr" | "bank_transfer";

// Core entities
export interface Waiter extends FullEntity {
  name: string;
  serves_coffee: boolean;
}

export interface MenuItem extends FullEntity {
  name: string;
  price: number;
}

export interface Order extends FullEntity {
  waiter_id: number;
  menu_item_id: number;
  quantity: number;
  total_price: number;
  payment_method: PaymentMethod;
}

export interface DailyReconciliation extends FullEntity {
  waiter_id: number;
  date: string;
  total_cash_expected: number;
  total_cash_collected: number;
  absent: number;
  rolled_over: number;
  extra_paid: number;
}

// Generic API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
