// @/lib/zod/order.ts

import { z } from "zod";
import { baseEntitySchema, baseUpdateSchema } from "./base";

export const paymentMethodSchema = z.enum(["cash", "telebirr", "bank_transfer"]);

export const orderBaseSchema = z.object({
  waiter_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number().min(1),
  total_price: z.number().positive(),
  payment_method: paymentMethodSchema,
});

export const createOrderSchema = orderBaseSchema.omit({ total_price: true }); // if backend calculates total_price
export const updateOrderSchema = orderBaseSchema.partial().merge(baseUpdateSchema);
export const fullOrderSchema = orderBaseSchema.merge(baseEntitySchema);
