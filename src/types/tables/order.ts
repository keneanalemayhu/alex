// @/types/tables/order.ts

import { FullEntity } from "@/types/base";

export type PaymentMethod = "cash" | "telebirr" | "bank_transfer";

export type Order = FullEntity & {
  waiter_id: number;
  menu_item_id: number;
  quantity: number;
  total_price: number;
  payment_method: PaymentMethod;
};
